import React, { useState } from "react"
import dateIdeas from "../data/DateIdeas"
import DateIdea from "../Components/DateIdea"
import config from "../config"
import { checkDistances } from "../utils"

const categories = [
  "Food",
  "Outdoors",
  "Sports",
  "Nature",
  "Learning",
  "Shopping",
  "Recreation",
  "Hike",
  "All",
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
const distances = [
  "On Campus - 1 mile",
  "1 - 5 miles",
  "5 - 10 miles",
  "10+ miles",
]

const DateIdeas = () => {
  const [categoriesChecked, setCategoriesChecked] = useState(
    Array(categories.length).fill(true)
  )
  const [distancesChecked, setDistancesChecked] = useState(
    Array(distances.length).fill(true)
  )
  const [maxPrice, setMaxPrice] = useState(50)
  const [majorRizz, setMajorRizz] = useState(false)

  const toggleCategory = (index) => {
    categoriesChecked[index] = !categoriesChecked[index]
    setCategoriesChecked([...categoriesChecked])
  }

  const toggleDistance = (index) => {
    distancesChecked[index] = !distancesChecked[index]
    setDistancesChecked([...distancesChecked])
  }

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

  const filteredDateIdeas = dateIdeas.filter((dateIdea) => {
    if (extractMinPrice(dateIdea) > maxPrice) return false
    if (majorRizz && !dateIdea.majorRizz) return false
    if (categoriesChecked[0] === "All") return true
    if (
      dateIdea.months &&
      !dateIdea.months.some((month) => month === months[new Date().getMonth()])
    )
      return false
    if (config.displayEventCategories)
      return dateIdea.categories.some(
        (type) => categoriesChecked[categories.indexOf(type)]
      )

    if (
      dateIdea.distanceFromCampus &&
      checkDistances(distancesChecked, dateIdea.distanceFromCampus)
    )
      return true

    if (dateIdea.locations) {
      return dateIdea.locations.some((location) =>
        checkDistances(distancesChecked, location.distanceFromCampus)
      )
    }
    return false
  })

  return (
    <div
      className={`box-section ${
        config.useSideFilters ? "box-section-narrow" : ""
      }`}
    >
      <h1 className="section-title">Date Ideas</h1>
      <div className="page-description">
        <h4>
          Here are a list of a few date ideas. Some are good for first dates,
          while others are better after already knowing a girl a little.
        </h4>
      </div>
      <div className={`filter-section${config.useSideFilters ? "-side" : ""}`}>
        <div
          className={`filter-parent${
            config.useSideFilters ? " filter-padding" : ""
          }`}
        >
          {config.useCategories ? (
            <div className="box-categories">
              <h3>Categories</h3>
              <div className="categories-parent">
                {categories.map((category, index) => (
                  <div key={index} className="row" style={{ width: "100px" }}>
                    <input
                      type="checkbox"
                      className="category-checkbox"
                      checked={categoriesChecked[index]}
                      index={index}
                      id={category}
                      onChange={() => toggleCategory(index)}
                    />
                    <label className="category-label" for={category}>
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="box-distances">
            <h3>How Far?</h3>
            <div className="distances-parent column">
              {distances.map((distance, index) => (
                <div key={index} className="row">
                  <input
                    type="checkbox"
                    className="distance-checkbox"
                    checked={distancesChecked[index]}
                    index={index}
                    id={distance}
                    onChange={() => toggleDistance(index)}
                  />
                  <label className="category-label" for={distance}>
                    {distance}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="event-price">
            <h3>Max Price</h3>
            <div className="slider-container">
              <h4 className="price-slider-label">
                Up to ${maxPrice} {maxPrice === 0 ? "(Free Only)" : ""}
              </h4>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="slider price-slider"
              />
            </div>
          </div>
          {config.useMajorRizz ? (
            <div className="event-major-rizz">
              <h3>Major Rizz</h3>
              <div className="price-checkbox-parent">
                <input
                  type="checkbox"
                  className="rizz-checkbox"
                  checked={majorRizz}
                  onChange={() => setMajorRizz(!majorRizz)}
                />
                <label className="rizz-label">Major Rizz Only</label>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="box-parent">
        {filteredDateIdeas.length > 0 ? (
          filteredDateIdeas.map((idea) => (
            <DateIdea {...idea} distancesChecked={distancesChecked} />
          ))
        ) : (
          <h2>No events found.</h2>
        )}
      </div>
    </div>
  )
}

export default DateIdeas
