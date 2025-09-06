import React, { useState } from "react"
import { EventList } from "../Components/Event"
import getCategoryFromId, {
  categories,
  getCategoryIndexFromCategory,
} from "../data/EventCategories"
import useCalenderAPI from "../hooks/useBYUAPI"
import BaddyProbability from "../data/BaddyProbability"
import config from "../config"

const url = "https://calendar.byu.edu/api/Events.json?categories=all&price=1000"
const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Today",
]
const sortOptions = ["Likeliness To Find a Girl", "Date"]
const likelinessStrings = ["Very Likely", "Likely", "Possible", "Unlikely"]

const collapseEvents = (events) => {
  if (!events) return []
  for (var i = 0; i < events.length; i++) {
    const event = events[i]
    event.quantity = 1
    event.times = [event.StartDateTime]
    event.endTimes = [event.EndDateTime]
    for (var j = 0; j < events.length; j++) {
      if (i === j) continue
      if (events[j].Title === event.Title) {
        event.quantity++
        event.times.push(events[j].StartDateTime)
        event.endTimes.push(events[j].EndDateTime)
      }
    }
  }

  const titles = []
  return events.filter((event) => {
    for (var i = 0; i < events.length; i++) {
      if (event.Title === events[i].Title) {
        if (titles.includes(event.Title)) {
          return false
        } else {
          titles.push(event.Title)
          return true
        }
      }
    }
    return true
  })
}

const EventsPage = () => {
  const [checked, setChecked] = useState(Array(categories.length).fill(true))
  const [days, setDays] = useState(Array(daysOfTheWeek.length).fill(true))
  const [sortBy, setSortBy] = useState(config.eventDefaultSortBy)
  const [baddyLikeliness, setBaddyLikeliness] = useState([
    true,
    true,
    false,
    false,
  ])

  const events = useCalenderAPI(url)

  const noEvents = events === null

  const toggleCategory = (e, index) => {
    checked[index] = !checked[index]
    setChecked([...checked])
  }

  const toggleDay = (e, index) => {
    days[index] = !days[index]
    setDays([...days])
  }

  const toggleBaddyLikeliness = (e, index) => {
    baddyLikeliness[index] = !baddyLikeliness[index]
    setBaddyLikeliness([...baddyLikeliness])
  }

  const eventAvailable = (event) => {
    var available = false
    event.times.forEach((time) => {
      const date = new Date(time)
      available =
        available ||
        days[date.getDay()] ||
        (days[days.length - 1] &&
          date.getDate() === new Date().getDate() &&
          date.getMonth() === new Date().getMonth())
    })
    return available
  }

  const filteredEvents = collapseEvents(events)
    .filter((event) => {
      const category = getCategoryFromId(event.CategoryId)
      const index = getCategoryIndexFromCategory(category)

      const bp = BaddyProbability(event)
      if (!baddyLikeliness[0] && bp >= 0.8) return false
      if (!baddyLikeliness[1] && bp < 0.8 && bp >= 0.6) return false
      if (!baddyLikeliness[2] && bp < 0.6 && bp >= 0.4) return false
      if (!baddyLikeliness[3] && bp < 0.4) return false

      if (index === -1) return false

      return (
        (config.displayEventCategories ? checked[index] : true) &&
        eventAvailable(event)
      )
    })
    .sort((a, b) => {
      if (sortBy === "Baddy Probability") {
        return BaddyProbability(b) - BaddyProbability(a)
      } else if (sortBy === "Date") {
        return new Date(a.StartDateTime) - new Date(b.StartDateTime)
      }
      return 0
    })

  filteredEvents.forEach((event) => {
    if (event.Title.toLowerCase().includes("football")) {
      event.IsFree = false
      event.ticketsRequired = true
    }
  })

  return (
    <>
      <div
        className={`box-section ${
          config.useSideFilters ? "box-section-narrow" : ""
        }`}
      >
        <h1 className="section-title">Where are the Baddies?</h1>
        <div className="page-description">
          <h4>
            In Provo, there are countless events designed to allow young men and
            young women to meet and fall in love. Here are some upcoming events
            where you might just find the love of your life!
          </h4>
        </div>
        <div
          className={`filter-section${config.useSideFilters ? "-side" : ""}`}
        >
          <div
            className={`filter-parent${
              config.useSideFilters ? " filter-padding" : ""
            }`}
          >
            {config.displayEventCategories ? (
              <div className="event-categories">
                <h3>Event Categories</h3>
                <div
                  className="categories-parent"
                  style={{ maxWidth: "340px" }}
                >
                  {categories.map((category, index) => (
                    <div key={index} className="row" style={{ width: "170px" }}>
                      <input
                        type="checkbox"
                        className="category-checkbox"
                        checked={checked[index]}
                        index={index}
                        onChange={(e) => toggleCategory(e, index)}
                      />
                      <label className="category-label">{category}</label>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="event-likelinesses">
              <h3>How Likely to Find a Girl?</h3>
              <div className="likeliness-values-parent">
                {likelinessStrings.map((value, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      className="likeliness-checkbox"
                      checked={baddyLikeliness[index]}
                      index={index}
                      onChange={(e) => toggleBaddyLikeliness(e, index)}
                    />
                    <label className="likeliness-label">{value}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="event-days">
              <h3>When?</h3>
              <div className="days-parent">
                <div className="days-column">
                  {days.slice(0, 4).map((day, index) => (
                    <div key={index} className="row" style={{ width: "100px" }}>
                      <input
                        type="checkbox"
                        className="day-checkbox"
                        checked={day}
                        index={index}
                        onChange={(e) => toggleDay(e, index)}
                      />
                      <label className="day-label">
                        {daysOfTheWeek[index]}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="days-column">
                  {days.slice(4, 8).map((day, index) => (
                    <div
                      key={index + 4}
                      className="row"
                      style={{ width: "100px" }}
                    >
                      <input
                        type="checkbox"
                        className="day-checkbox"
                        checked={day}
                        index={index + 4}
                        onChange={(e) => toggleDay(e, index + 4)}
                      />
                      <label className="day-label">
                        {daysOfTheWeek[index + 4]}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="event-sort">
              <h3>Sort By:</h3>
              <div className="sort-parent">
                {sortOptions.map((option, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      className="sort-radio"
                      name="event-sort"
                      onChange={() => setSortBy(option)}
                      checked={sortBy === option}
                    />
                    <label className="sort-label">{option}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="box-parent">
          {filteredEvents.length > 0 ? (
            <EventList events={filteredEvents} />
          ) : (
            <h2 style={{ color: "var(--default-text-color)" }}>
              {noEvents ? "Loading..." : "No events found."}
            </h2>
          )}
        </div>
      </div>
    </>
  )
}

export default EventsPage
