import React from "react"
import getBaddyProbability, {
  getLikelinessFromBaddyProbability,
} from "../data/BaddyProbability"
import { getBackgroundColorFromBaddyProbability } from "../data/BaddyProbability"
import config from "../config"
import WebsiteLink from "./WebsiteLink"
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

const getNumberEnding = (number) => {
  if (number === 1 || number === 21 || number === 31) {
    return "st"
  } else if (number === 2 || (number > 20 && number % 10 === 2)) {
    return "nd"
  } else if (number === 3 || (number > 20 && number % 10 === 3)) {
    return "rd"
  } else {
    return "th"
  }
}

export const EventList = ({ events }) => (
  <>
    {events
      ? events.map((event, index) => {
          return <Event key={index} event={event} index={index} />
        })
      : null}
  </>
)

export const Event = ({ event, index }) => {
  const date = new Date(event.StartDateTime)
  if (Date.parse(date) <= Date.now()) return null

  const hasTickets = event.TicketsExist && event.TicketsExist.trim() === "Yes"
  const baddyProbability = getBaddyProbability(event)

  // Array of club images for clubs night events
  const clubImages = [
    `${process.env.PUBLIC_URL}/images/clubs/a_cappella_club.png`,
    `${process.env.PUBLIC_URL}/images/clubs/baking_club.png`,
    `${process.env.PUBLIC_URL}/images/clubs/come_follow_me_club.png`,
    `${process.env.PUBLIC_URL}/images/clubs/dancing_club.png`,
    `${process.env.PUBLIC_URL}/images/clubs/disney_club.png`,
    `${process.env.PUBLIC_URL}/images/clubs/divine_comedy.png`,
    `${process.env.PUBLIC_URL}/images/clubs/english_society.png`,
    `${process.env.PUBLIC_URL}/images/clubs/exercise_club.png`,
    `${process.env.PUBLIC_URL}/images/clubs/family_history_club.png`,
    `${process.env.PUBLIC_URL}/images/clubs/food_science_club.png`,
    `${process.env.PUBLIC_URL}/images/clubs/french_association.png`,
    `${process.env.PUBLIC_URL}/images/clubs/gardening_club.png`,
    `${process.env.PUBLIC_URL}/images/clubs/illustration_association.png`,
    `${process.env.PUBLIC_URL}/images/clubs/its_just_dinner.png`,
    `${process.env.PUBLIC_URL}/images/clubs/music_lovers_club.png`,
    `${process.env.PUBLIC_URL}/images/clubs/speech_and_debate_club.png`,
    `${process.env.PUBLIC_URL}/images/clubs/tall_club.png`,
  ]

  // Get random club image for clubs night events
  const getRandomClubImage = () => {
    const randomIndex = Math.floor(Math.random() * clubImages.length)
    return clubImages[randomIndex]
  }

  if (!event.ImgUrl) return null
  if (event.Title.toLowerCase().includes("tuition")) return null

  return (
    <div key={index} className="box">
      <div className="box-top">
        {/* {event.IsFeatured === "true" ? (
          <div className="event-featured">FEATURED</div>
        ) : null} */}
        <h2 className="box-title">{event.Title}</h2>
        {event.Description ? (
          <div className="box-description">
            {event.Description.replace(/<[^>]*>/g, "")
              .replace("amp;", "")
              .replace(/&nbsp;/g, " ")
              .substring(0, config.maxEventDescriptionLength) +
              (event.Description.length > config.maxEventDescriptionLength
                ? "..."
                : "")}
          </div>
        ) : null}
      </div>
      <div className="box-bottom">
        <div className="box-information">
          {config.displayEventLocation ? (
            <div className="box-location">
              <strong>Location</strong>: {event.LocationName}
            </div>
          ) : null}

          <div className="box-date">
            <strong>Date{event.quantity > 1 ? "s" : ""}</strong>:{" "}
            {event.times.length > 1 ? (
              <ul className="box-times" style={{ marginTop: "10px" }}>
                {event.times.map((time) => {
                  const date = new Date(time)
                  return (
                    <li>
                      {days[date.getDay()]}, {months[date.getMonth()]}{" "}
                      {date.getDate()}
                      {getNumberEnding(date.getDate())}{" "}
                      {event.AllDay === "true"
                        ? " (All Day)"
                        : "@ " + toTime(date)}
                    </li>
                  )
                })}
              </ul>
            ) : (
              days[date.getDay()] +
              ", " +
              months[date.getMonth()] +
              " " +
              date.getDate() +
              getNumberEnding(date.getDate()) +
              (event.AllDay === "true" ? " (All Day)" : " @ " + toTime(date))
            )}
          </div>
          <div className="box-category">
            <strong>Category</strong>: {event.CategoryName}
          </div>

          {event.DeptNames.length === 0 ? null : (
            <div className="box-department">
              <strong>Department</strong>: {event.DeptNames}
            </div>
          )}
          {event.IsFree === "true" ? (
            !hasTickets ? (
              <div className="box-price">
                <strong>Price</strong>: Free
              </div>
            ) : null
          ) : (
            <div className="box-price">
              {!event.ticketsRequired ? (
                (
                  <strong>Price</strong>
                )`: ${event.LowPrice} to ${event.HighPrice}`
              ) : (
                <strong>Tickets Required</strong>
              )}
            </div>
          )}
          <h4
            className="baddy-probability"
            style={{
              backgroundColor:
                getBackgroundColorFromBaddyProbability(baddyProbability),
            }}
          >
            {config.displayBaddyProbability
              ? `Estimated Baddy Probability: ${Math.round(
                  baddyProbability * 100
                )}%`
              : getLikelinessFromBaddyProbability(baddyProbability)}
          </h4>
          <WebsiteLink
            href={event.FullUrl}
            opensNewTab
            style={{ margin: "0px" }}
          >
            Click to Learn More
          </WebsiteLink>
          {event.Title.toLowerCase() === "clubs night" ? (
            <WebsiteLink href="/clubs" style={{ margin: "0px" }}>
              Find Clubs
            </WebsiteLink>
          ) : null}
          {hasTickets ? (
            <WebsiteLink
              href={event.TicketsUrl}
              opensNewTab
              style={{ margin: "0px" }}
            >
              Buy Tickets
            </WebsiteLink>
          ) : null}
        </div>

        <img
          src={
            event.Title.toLowerCase().includes("football")
              ? `${process.env.PUBLIC_URL}/images/events/football.png`
              : event.Title.toLowerCase() === "clubs night"
              ? getRandomClubImage()
              : event.Title.toLowerCase().includes("study abroad") ||
                event.Title.toLowerCase().includes("studyabroad") ||
                event.Description?.toLowerCase().includes("study abroad") ||
                event.Description?.toLowerCase().includes("studyabroad")
              ? `${process.env.PUBLIC_URL}/images/events/study_abroad.png`
              : event.Title.toLowerCase().includes("devotional") ||
                event.Description?.toLowerCase().includes("devotional")
              ? `${process.env.PUBLIC_URL}/images/events/devotional.png`
              : event.ImgUrl
          }
          alt=""
          className="box-image"
        />
      </div>
    </div>
  )
}

export default Event
