import React, { useState } from "react"
import config from "../config"
import { checkDistances, timeString } from "../utils"
import WebsiteLink from "./WebsiteLink"
import { SeeMoreButton } from "./Components"

const getBackgroundColorFromRating = (rating) => {
  var stars = 0
  for (var i = 0; i < rating.length; i++) {
    if (rating.charAt(i) === "★") stars++
  }
  if (stars === 5) return "green"
  if (stars === 4) return "yellow"
  if (stars === 3) return "orange"
  if (stars === 2) return "red"
  return "darkred"
}

const dateNumberString = (dateNumber) => {
  if (dateNumber === 0) return "Great for a first date!"
  if (dateNumber === 1) return "Great for a second date!"
  if (dateNumber === 2) return "Great if you've gone a couple dates together!"
  return "Great if you've gone on a few dates together!"
}

const distanceString = (distance) => {
  if (distance === 1) return "1 mile"
  if (distance < 0) return "On Campus"
  return `${distance} miles`
}

const formatSeasonalAvailability = (seasonalTimeframe) => {
  if (!seasonalTimeframe || !seasonalTimeframe.months) return null

  const months = seasonalTimeframe.months
  if (months.length === 12) return null // Year-round, don't show

  if (months.length === 1) {
    return `Available in ${months[0]}`
  }

  if (months.length === 2) {
    return `Available in ${months[0]} and ${months[1]}`
  }

  // For 3+ months, show range
  const firstMonth = months[0]
  const lastMonth = months[months.length - 1]

  // Check if it's a continuous range
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

  const firstIndex = monthNames.indexOf(firstMonth)
  const lastIndex = monthNames.indexOf(lastMonth)

  // If it's a continuous range, show as range
  if (lastIndex >= firstIndex && lastIndex - firstIndex + 1 === months.length) {
    return `Available ${firstMonth} - ${lastMonth}`
  }

  // Otherwise show as list
  return `Available: ${months.join(", ")}`
}

const DateIdea = (props) => {
  const [seeMore, setSeeMore] = useState(false)
  const hasSmallInformation =
    props.pricing ||
    props.hours ||
    props.estimatedTime ||
    props.minDateNumber ||
    formatSeasonalAvailability(props.seasonalTimeframe) ||
    props.isEvent

  const locationsToShow = props.locations?.filter((location) => {
    // If maxDistance is provided (from Plan a Date page), use that for filtering
    if (props.maxDistance !== undefined) {
      return location.distanceFromCampus <= props.maxDistance
    }
    // Otherwise use the existing distancesChecked logic (for main Date Ideas page)
    return checkDistances(props.distancesChecked, location.distanceFromCampus)
  })

  // Show "Find on Maps" if there are no locations at all, or if all locations are filtered out
  // But don't show for events since they have their own website
  const shouldShowMapsButton =
    !props.isEvent &&
    (!props.locations ||
      (props.locations && locationsToShow && locationsToShow.length === 0))

  return (
    <div className="box">
      <div className="box-top">
        <h2 className="box-title">
          {props.majorRizz && config.useMajorRizz ? (
            <h4 className="major-rizz">Major Rizz</h4>
          ) : null}
          <div>{props.name}</div>
        </h2>

        {props.description ? (
          <div className="box-description">
            {props.description.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        ) : null}
      </div>
      <div className="box-bottom">
        <div className="box-information">
          {hasSmallInformation ? (
            <div className="small-information">
              {props.pricing ? (
                <div className="pricing">
                  <strong>Price</strong>: {props.pricing}
                </div>
              ) : null}
              {props.hours ? (
                <div>
                  <strong>Hours</strong>: {props.hours}
                </div>
              ) : null}
              {props.estimatedTime && timeString(props.estimatedTime) ? (
                <div className="estimated-time">
                  <strong>Estimated Time</strong>:{" "}
                  {timeString(props.estimatedTime)}
                </div>
              ) : null}
              {props.distanceFromCampus ? (
                <div className="distance-from-campus">
                  <strong>Distance From Campus</strong>:{" "}
                  {distanceString(props.distanceFromCampus)}
                </div>
              ) : null}
              {config.displayDateNumber ? (
                <div className="min-date-number">
                  {dateNumberString(props.minDateNumber)}
                </div>
              ) : null}
              {!props.hideSeasonalAvailability &&
              formatSeasonalAvailability(props.seasonalTimeframe) ? (
                <div className="seasonal-availability">
                  <strong>Seasonal Availability</strong>:{" "}
                  {formatSeasonalAvailability(props.seasonalTimeframe)}
                </div>
              ) : null}
              {props.isEvent ? (
                <div className="event-details">
                  <div className="event-date">
                    <strong>Event Date</strong>: {props.eventDate}
                  </div>
                  <div className="event-time">
                    <strong>Event Time</strong>: {props.eventTime}
                  </div>
                  {!props.hideEventDetails && (
                    <>
                      <div className="event-category">
                        <strong>Category</strong>: {props.category}
                      </div>
                      {props.baddyProbability ? (
                        <div className="event-baddy-probability">
                          <strong>Baddy Probability</strong>:{" "}
                          {Math.round(props.baddyProbability * 100)}%
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Only show "Locations Nearby" if there are actually locations to display */}
          {locationsToShow && locationsToShow.length > 0 ? (
            <div>
              <h4 style={{ margin: "0px 0px 10px 0px" }}>Locations Nearby</h4>
              <div className="locations">
                {locationsToShow
                  .slice(0, seeMore ? locationsToShow.length : 3)
                  .map(({ name, src, distanceFromCampus }, index) => {
                    if (
                      !checkDistances(
                        props.distancesChecked,
                        distanceFromCampus
                      )
                    )
                      return null
                    return (
                      <WebsiteLink href={src} key={index}>
                        {name} - {distanceString(distanceFromCampus)}
                      </WebsiteLink>
                    )
                  })}
                {locationsToShow.length > 3 ? (
                  <SeeMoreButton
                    onClick={() => setSeeMore(!seeMore)}
                    seeMore={seeMore}
                  />
                ) : null}
              </div>
            </div>
          ) : null}

          {/* Show "Find on Maps" button separately when needed */}
          {shouldShowMapsButton ? (
            <div style={{ marginBottom: "-5px" }}>
              <WebsiteLink
                href={`https://www.google.com/maps/search/${encodeURIComponent(
                  props.name + " near Provo, UT"
                )}`}
                target="_blank"
              >
                Find on Maps
              </WebsiteLink>
            </div>
          ) : null}

          {props.rating && config.displayDateIdeaRatings ? (
            <h4
              className="baddy-probability"
              style={{
                backgroundColor: getBackgroundColorFromRating(props.rating),
              }}
            >
              Rating: {props.rating}
            </h4>
          ) : null}
          {props.website ? (
            <WebsiteLink href={props.website}>
              {props.isEvent ? "Learn More" : "Website"}
            </WebsiteLink>
          ) : null}
          {props.link ? (
            <WebsiteLink href={props.link.url}>{props.link.text}</WebsiteLink>
          ) : null}
        </div>
        <img src={props.imgSrc} alt="" className="box-image" />
      </div>
    </div>
  )
}

export default DateIdea
