import React, { useState, useEffect } from "react"
import dateIdeas from "../data/DateIdeas"
import DateIdea from "../Components/DateIdea"
import config from "../config"
import { checkDistances } from "../utils"
import useCalenderAPI from "../hooks/useBYUAPI"
import getBaddyProbability from "../data/BaddyProbability"

const PlanADate = () => {
  const [step, setStep] = useState(1)
  const [maxPrice, setMaxPrice] = useState(50)
  const [selectedDate, setSelectedDate] = useState("")
  const [startHour, setStartHour] = useState(12)
  const [endHour, setEndHour] = useState(18)
  const [maxDistance, setMaxDistance] = useState(10)
  const [filteredIdeas, setFilteredIdeas] = useState([])
  const [distancesChecked, setDistancesChecked] = useState([
    true,
    true,
    true,
    true,
  ])
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [showDateError, setShowDateError] = useState(false)

  // Fetch events from BYU API
  const url =
    "https://calendar.byu.edu/api/Events.json?categories=all&price=1000"
  const events = useCalenderAPI(url)

  // Function to extract minimum price from pricing string
  const extractMinPrice = (dateIdea) => {
    if (dateIdea.free) return 0
    if (!dateIdea.pricing) return 0

    // Extract numbers from pricing string (e.g., "$20-30/person" -> [20, 30])
    const numbers = dateIdea.pricing.match(/\d+/g)
    if (!numbers) return 0

    // Return the lowest number found (starting price)
    return Math.min(...numbers.map(Number))
  }

  // Function to extract price from event
  const extractEventPrice = (event) => {
    if (event.IsFree === "true") return 0
    if (event.LowPrice) return parseFloat(event.LowPrice)
    return 0
  }

  // Function to check if date idea is suitable for the selected date
  const isDateSuitable = (dateIdea) => {
    if (!selectedDate) return true

    const selectedDateObj = new Date(selectedDate)
    const currentMonth = selectedDateObj.getMonth()
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const selectedMonthName = monthNames[currentMonth]

    // If the date idea has specific months, check if current month is included
    if (dateIdea.months && !dateIdea.months.includes(selectedMonthName)) {
      return false
    }

    return true
  }

  // Function to check if event is suitable for the selected date
  const isEventDateSuitable = (event) => {
    if (!selectedDate) return true

    // Parse the selected date
    const [year, month, day] = selectedDate.split("-").map(Number)

    const eventDate = new Date(event.StartDateTime)

    // Compare date components directly without timezone conversion
    return (
      eventDate.getFullYear() === year &&
      eventDate.getMonth() === month - 1 && // month is 0-indexed
      eventDate.getDate() === day
    )
  }

  // Function to check if time range is suitable for date idea
  const isTimeSuitable = (dateIdea) => {
    // If the date idea doesn't have timeOfDay specified, assume it's suitable for any time
    if (!dateIdea.timeOfDay || dateIdea.timeOfDay.length === 0) {
      return true
    }

    // Special handling for date ideas with specific hours
    if (dateIdea.hours) {
      // Extract hours from the hours string (e.g., "Saturday 9AM-2PM")
      const hoursMatch = dateIdea.hours.match(
        /(\d{1,2})(AM|PM)-(\d{1,2})(AM|PM)/
      )
      if (hoursMatch) {
        const startHourStr = parseInt(hoursMatch[1])
        const startPeriod = hoursMatch[2]
        const endHourStr = parseInt(hoursMatch[3])
        const endPeriod = hoursMatch[4]

        // Convert to 24-hour format
        let activityStartHour = startHourStr
        if (startPeriod === "PM" && startHourStr !== 12) {
          activityStartHour += 12
        } else if (startPeriod === "AM" && startHourStr === 12) {
          activityStartHour = 0
        }

        let activityEndHour = endHourStr
        if (endPeriod === "PM" && endHourStr !== 12) {
          activityEndHour += 12
        } else if (endPeriod === "AM" && endHourStr === 12) {
          activityEndHour = 0
        }

        // Check if the selected time range overlaps with the activity's actual hours
        // The activity must be available for at least part of the selected time range
        if (startHour >= activityEndHour || endHour <= activityStartHour) {
          return false
        }
      }
    }

    // Convert selected time range to time of day categories
    const selectedTimeCategories = []

    // Add time categories based on the selected hour range
    for (let hour = startHour; hour < endHour; hour++) {
      if (hour >= 6 && hour < 12) {
        selectedTimeCategories.push("morning")
      } else if (hour >= 12 && hour < 18) {
        selectedTimeCategories.push("afternoon")
      } else if (hour >= 18 && hour < 22) {
        selectedTimeCategories.push("evening")
      } else if (hour >= 22 || hour < 6) {
        selectedTimeCategories.push("night")
      }
    }

    // Remove duplicates
    const uniqueSelectedCategories = [...new Set(selectedTimeCategories)]

    // Check if any of the selected time categories overlap with the date idea's available times
    const hasOverlap = uniqueSelectedCategories.some((category) =>
      dateIdea.timeOfDay.includes(category)
    )

    // If there's no overlap, don't show the date idea
    if (!hasOverlap) {
      return false
    }

    // Additional check: if the date idea only has one time category and it's the last hour of the selected range,
    // and the selected range is only one hour, don't show it (no meaningful overlap)
    if (
      uniqueSelectedCategories.length === 1 &&
      dateIdea.timeOfDay.length === 1
    ) {
      const selectedCategory = uniqueSelectedCategories[0]
      const dateIdeaCategory = dateIdea.timeOfDay[0]

      // Check if this is a boundary case where the date idea ends when the date begins
      if (selectedCategory === dateIdeaCategory) {
        // For single-hour selections, ensure there's meaningful overlap
        if (endHour - startHour === 1) {
          // Check if the date idea's time category ends exactly when our selection begins
          const categoryEndHours = {
            morning: 12,
            afternoon: 18,
            evening: 22,
            night: 6,
          }

          const categoryStartHours = {
            morning: 6,
            afternoon: 12,
            evening: 18,
            night: 22,
          }

          // If the date idea's category ends exactly when our selection starts, don't show it
          if (categoryEndHours[selectedCategory] === startHour) {
            return false
          }

          // If our selection ends exactly when the date idea's category starts, don't show it
          if (categoryStartHours[selectedCategory] === endHour) {
            return false
          }
        }
      }
    }

    return true
  }

  // Function to check if time range is suitable for event
  const isEventTimeSuitable = (event) => {
    const eventDate = new Date(event.StartDateTime)
    const eventHour = eventDate.getHours()

    // Check if event time falls within the selected hour range
    return eventHour >= startHour && eventHour <= endHour
  }

  // Function to check if distance is suitable for date idea
  const isDistanceSuitable = (dateIdea) => {
    // Check if the date idea has a direct distance from campus
    if (
      dateIdea.distanceFromCampus &&
      dateIdea.distanceFromCampus > maxDistance
    ) {
      return false
    }

    // Check if the date idea has locations and if any are within the distance limit
    if (dateIdea.locations) {
      const hasLocationWithinDistance = dateIdea.locations.some(
        (location) => location.distanceFromCampus <= maxDistance
      )
      if (!hasLocationWithinDistance) {
        return false
      }
    }

    return true
  }

  // Function to check if distance is suitable for event
  const isEventDistanceSuitable = (event) => {
    // Most BYU events are on campus, so we'll assume they're within distance
    // This could be enhanced with actual location data if available
    return true
  }

  // Function to convert event to date idea format
  const convertEventToDateIdea = (event) => {
    const eventDate = new Date(event.StartDateTime)
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const toTime = (date) => {
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const ampm = hours >= 12 ? "PM" : "AM"
      return `${hours % 12 || 12}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`
    }

    return {
      name: event.Title,
      description: event.Description
        ? event.Description.replace(/<[^>]*>/g, "")
            .replace("amp;", "")
            .replace(/&nbsp;/g, " ")
        : "",
      pricing:
        event.IsFree === "true"
          ? "Free"
          : `$${event.LowPrice}${
              event.HighPrice && event.HighPrice !== event.LowPrice
                ? ` - $${event.HighPrice}`
                : ""
            }`,
      free: event.IsFree === "true",
      imgSrc: event.ImgUrl,
      website: event.FullUrl,
      distanceFromCampus: 0, // On campus
      estimatedTime: "2-3 hours",
      timeOfDay: ["morning", "afternoon", "evening"], // Default to most times
      seasonalTimeframe: {
        months: [months[eventDate.getMonth()]],
      },
      // Add event-specific information
      isEvent: true,
      eventDate: `${days[eventDate.getDay()]}, ${
        months[eventDate.getMonth()]
      } ${eventDate.getDate()}`,
      eventTime: event.AllDay === "true" ? "All Day" : toTime(eventDate),
      category: event.CategoryName,
      baddyProbability: getBaddyProbability(event),
    }
  }

  const handleNextQuestion = () => {
    // Validate that a date is selected for question 2
    if (currentQuestion === 2 && !selectedDate) {
      setShowDateError(true)
      return
    }

    // Clear error when proceeding
    setShowDateError(false)

    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleGenerateIdeas()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleGenerateIdeas = () => {
    // Filter date ideas
    const filteredDateIdeas = dateIdeas.filter((dateIdea) => {
      // Check price range
      if (extractMinPrice(dateIdea) > maxPrice) return false

      // Check date suitability
      if (!isDateSuitable(dateIdea)) return false

      // Check time suitability
      if (!isTimeSuitable(dateIdea)) return false

      // Check distance suitability
      if (!isDistanceSuitable(dateIdea)) return false

      return true
    })

    // Filter and convert events
    const filteredEvents = events
      ? events
          .filter((event) => {
            // Skip past events
            if (new Date(event.StartDateTime) <= new Date()) return false

            // Check price range
            if (extractEventPrice(event) > maxPrice) return false

            // Check date suitability
            if (!isEventDateSuitable(event)) return false

            // Check time suitability
            if (!isEventTimeSuitable(event)) return false

            // Check distance suitability
            if (!isEventDistanceSuitable(event)) return false

            return true
          })
          .map(convertEventToDateIdea)
      : []

    // Combine and sort by baddy probability (events first, then date ideas)
    const combined = [...filteredEvents, ...filteredDateIdeas].sort((a, b) => {
      // Sort events by baddy probability (highest first)
      if (a.isEvent && b.isEvent) {
        return (b.baddyProbability || 0) - (a.baddyProbability || 0)
      }
      // Events come before date ideas
      if (a.isEvent && !b.isEvent) return -1
      if (!a.isEvent && b.isEvent) return 1
      return 0
    })

    setFilteredIdeas(combined)
    setStep(2)
  }

  const resetForm = () => {
    setStep(1)
    setCurrentQuestion(1)
    setShowDateError(false)
    setMaxPrice(50)
    setSelectedDate("")
    setStartHour(12)
    setEndHour(18)
    setMaxDistance(10)
    setFilteredIdeas([])
  }

  const renderQuestion = () => {
    const questionStyle = {
      marginBottom: "30px",
    }

    const buttonParentStyle = {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
    }

    switch (currentQuestion) {
      case 1:
        return (
          <div style={questionStyle}>
            <h3>What's your budget?</h3>
            <div className="slider-container" style={{ width: "100%" }}>
              <h4 className="price-slider-label">
                Up to ${maxPrice} {maxPrice === 0 ? "(Free Only)" : ""}
              </h4>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="slider price-slider"
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handleNextQuestion}
                className="website-link-inverted"
              >
                Next
              </button>
            </div>
          </div>
        )

      case 2:
        return (
          <div style={questionStyle}>
            <h3>When is your date?</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value)
                setShowDateError(false) // Clear error when user selects a date
              }}
              style={{
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "100%",
                marginBottom: showDateError ? "10px" : "20px",
              }}
            />
            {showDateError && (
              <p
                style={{ color: "red", marginBottom: "20px", fontSize: "14px" }}
              >
                Please select a date before continuing.
              </p>
            )}
            <div style={buttonParentStyle}>
              <button
                onClick={handlePreviousQuestion}
                className="website-link-inverted"
              >
                Back
              </button>
              <button
                onClick={handleNextQuestion}
                className="website-link-inverted"
              >
                Next
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div style={questionStyle}>
            <h3>What time of day?</h3>
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <h4 style={{ marginBottom: "15px", color: "var(--byu-blue)" }}>
                {startHour === 0
                  ? "12 AM"
                  : startHour < 12
                  ? `${startHour} AM`
                  : startHour === 12
                  ? "12 PM"
                  : `${startHour - 12} PM`}{" "}
                -{" "}
                {endHour === 0
                  ? "12 AM"
                  : endHour < 12
                  ? `${endHour} AM`
                  : endHour === 12
                  ? "12 PM"
                  : endHour === 24
                  ? "12 AM"
                  : `${endHour - 12} PM`}
              </h4>

              {/* Time Selection Dropdowns */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "bold",
                    }}
                  >
                    Start Time:
                  </label>
                  <select
                    value={startHour}
                    onChange={(e) => {
                      const newStart = Number(e.target.value)
                      if (newStart < endHour - 1) {
                        setStartHour(newStart)
                      }
                    }}
                    style={{
                      padding: "10px",
                      fontSize: "16px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "100%",
                      backgroundColor: "white",
                    }}
                  >
                    {Array.from({ length: 25 }, (_, i) => {
                      const hour = i
                      const displayTime =
                        hour === 0
                          ? "12 AM"
                          : hour < 12
                          ? `${hour} AM`
                          : hour === 12
                          ? "12 PM"
                          : `${hour - 12} PM`
                      return (
                        <option key={hour} value={hour}>
                          {displayTime}
                        </option>
                      )
                    })}
                  </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "bold",
                    }}
                  >
                    End Time:
                  </label>
                  <select
                    value={endHour}
                    onChange={(e) => {
                      const newEnd = Number(e.target.value)
                      if (newEnd > startHour + 1) {
                        setEndHour(newEnd)
                      }
                    }}
                    style={{
                      padding: "10px",
                      fontSize: "16px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "100%",
                      backgroundColor: "white",
                    }}
                  >
                    {Array.from({ length: 25 }, (_, i) => {
                      const hour = i
                      const displayTime =
                        hour === 0
                          ? "12 AM"
                          : hour < 12
                          ? `${hour} AM`
                          : hour === 12
                          ? "12 PM"
                          : hour === 24
                          ? "12 AM"
                          : `${hour - 12} PM`
                      return (
                        <option key={hour} value={hour}>
                          {displayTime}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>

              {/* Quick Selection Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                }}
              >
                {[
                  { label: "Morning", start: 6, end: 12 },
                  { label: "Afternoon", start: 12, end: 18 },
                  { label: "Evening", start: 18, end: 22 },
                  { label: "Late Night", start: 22, end: 24 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setStartHour(preset.start)
                      setEndHour(preset.end)
                    }}
                    style={{
                      padding: "8px 16px",
                      border: "2px solid var(--byu-blue)",
                      backgroundColor: "white",
                      color: "var(--byu-blue)",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "var(--byu-blue)"
                      e.target.style.color = "white"
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white"
                      e.target.style.color = "var(--byu-blue)"
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={buttonParentStyle}>
              <button
                onClick={handlePreviousQuestion}
                className="website-link-inverted"
              >
                Back
              </button>
              <button
                onClick={handleNextQuestion}
                className="website-link-inverted"
              >
                Next
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div style={questionStyle}>
            <h3>How far are you willing to travel?</h3>
            <div className="slider-container" style={{ width: "100%" }}>
              <h4 className="price-slider-label">
                Up to {maxDistance} miles from BYU Campus
              </h4>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="slider price-slider"
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ ...buttonParentStyle, marginTop: "20px" }}>
              <button
                onClick={handlePreviousQuestion}
                className="website-link-inverted"
              >
                Back
              </button>
              <button
                onClick={handleNextQuestion}
                className="website-link-inverted"
              >
                Generate Date Ideas
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (step === 1) {
    return (
      <div className="section" style={{ minHeight: "calc(100vh - 116px)" }}>
        <h1 className="section-title">Plan Your Perfect Date</h1>
        <div className="page-description">
          <h4>
            Let's find the perfect date idea for you! We'll ask a few questions
            to personalize your experience.
          </h4>
        </div>

        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
          {/* Progress indicator */}
          <div style={{ marginBottom: "40px", textAlign: "center" }}>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              {[1, 2, 3, 4].map((question) => (
                <div
                  key={question}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor:
                      question <= currentQuestion
                        ? "var(--byu-blue)"
                        : "#e0e0e0",
                    transition: "background-color 0.3s ease",
                  }}
                />
              ))}
            </div>
            <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
              Question {currentQuestion} of 4
            </p>
          </div>

          {renderQuestion()}
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <h1 className="section-title">Your Perfect Date Ideas</h1>
      <div className="page-description" style={{ paddingBottom: "0px" }}>
        <h4>
          Based on your preferences, here are some great date ideas for you!
        </h4>
        <p style={{ marginTop: "10px", fontSize: "16px" }}>
          Budget: Up to ${maxPrice} | Date: {selectedDate || "Any date"} | Time:{" "}
          {startHour === 0
            ? "12 AM"
            : startHour < 12
            ? `${startHour} AM`
            : startHour === 12
            ? "12 PM"
            : `${startHour - 12} PM`}{" "}
          -{" "}
          {endHour === 0
            ? "12 AM"
            : endHour < 12
            ? `${endHour} AM`
            : endHour === 12
            ? "12 PM"
            : endHour === 24
            ? "12 AM"
            : `${endHour - 12} PM`}{" "}
          | Distance: Up to {maxDistance} miles
        </p>
      </div>

      <button
        onClick={resetForm}
        className="website-link-inverted"
        style={{ marginBottom: "20px", marginTop: "20px" }}
      >
        Start Over
      </button>

      <div className="box-parent">
        {filteredIdeas.length > 0 ? (
          filteredIdeas.map((dateIdea, index) => (
            <DateIdea
              key={index}
              {...dateIdea}
              index={index}
              distancesChecked={distancesChecked}
              maxDistance={maxDistance}
              hideSeasonalAvailability={true}
              hideEventDetails={true}
            />
          ))
        ) : (
          <h2 style={{ color: "var(--default-text-color)" }}>
            No date ideas found matching your criteria. Try adjusting your
            preferences!
          </h2>
        )}
      </div>
    </div>
  )
}

export default PlanADate
