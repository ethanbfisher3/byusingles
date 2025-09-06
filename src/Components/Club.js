import React, { useState } from "react"
import {
  getBackgroundColorFromBaddyProbability,
  getLikelinessFromBaddyProbability,
} from "../data/BaddyProbability.js"
import config from "../config.js"
import WebsiteLink from "../Components/WebsiteLink.js"
import { SeeMoreButton } from "./Components.js"

const Club = ({ club }) => {
  const [seeMore, setSeeMore] = useState(false)
  return (
    <div className="box">
      <div className="box-top">
        <h2 className="box-name">{club.name}</h2>
        <p className="box-description">{club.description}</p>
      </div>
      <div className="box-bottom">
        <div className="box-information">
          {club.time ? (
            <div className="club-time">
              <strong>Time</strong>: {club.time}
            </div>
          ) : null}
          <div className="club-cost">
            <strong>Cost</strong>: {club.cost}
          </div>
          {config.showBaddyProbabilityInClubsPage ? (
            <h4
              className="baddy-probability"
              style={{
                backgroundColor: getBackgroundColorFromBaddyProbability(
                  club.baddyProbability
                ),
              }}
            >
              {config.displayBaddyProbability
                ? `Estimated Baddy Probability: ${Math.round(
                    club.baddyProbability * 100
                  )}%`
                : getLikelinessFromBaddyProbability(club.baddyProbability)}
            </h4>
          ) : null}
          {club.url ? (
            <WebsiteLink href={club.url} opensNewTab style={{ margin: "0px" }}>
              {club.requestToJoin ? "Request to Join" : "Join Now"}
            </WebsiteLink>
          ) : null}
          {club.subClubs ? (
            <div className="subclubs-parent">
              {club.subClubs
                .slice(0, seeMore ? club.subClubs.length : 3)
                .map((subclub, index) => {
                  return (
                    <div key={index}>
                      <WebsiteLink href={subclub.url}>
                        {subclub.name}
                      </WebsiteLink>
                    </div>
                  )
                })}
              {club.subClubs.length > 3 ? (
                <SeeMoreButton
                  onClick={() => setSeeMore(!seeMore)}
                  seeMore={seeMore}
                />
              ) : null}
            </div>
          ) : null}
        </div>
        {club.image ? (
          <img src={club.image} className="box-image" alt={club.name} />
        ) : null}
      </div>
    </div>
  )
}

export default Club
