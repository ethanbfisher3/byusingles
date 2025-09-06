import React, { useState } from "react"
import {
  getBackgroundColorFromBaddyProbability,
  getLikelinessFromBaddyProbability,
} from "../data/BaddyProbability.js"
import config from "../config.js"
import WebsiteLink from "../Components/WebsiteLink.js"
import { SeeMoreButton } from "../Components/Components.js"

const difficultyToColor = (difficulty) => {
  return config.invertedColors ? "var(--byu-light-blue)" : "var(--byu-blue)"
  // if (difficulty === "Easy") return "green"
  // if (difficulty === "Moderate") return "yellow"
  // if (difficulty === "Difficult") return "red"
  // return "red"
}

const _Class = ({ cls }) => {
  const [seeMore, setSeeMore] = useState(false)
  return (
    <div className="box">
      <div className="box-top">
        <h2 className="box-name">{cls.name}</h2>
        <p className="box-description">{cls.description}</p>
      </div>
      <div className="box-bottom">
        <div className="box-information">
          {config.showBaddyProbabilityInClassesPage ? (
            <h4
              className="baddy-probability"
              style={{
                backgroundColor: getBackgroundColorFromBaddyProbability(
                  cls.baddyProbability
                ),
              }}
            >
              {config.displayBaddyProbability
                ? `Estimated Baddy Probability: ${Math.round(
                    cls.baddyProbability * 100
                  )}%`
                : getLikelinessFromBaddyProbability(cls.baddyProbability)}
            </h4>
          ) : null}
          {config.displayClassDifficulty ? (
            <h4
              className="baddy-probability"
              style={{
                backgroundColor: difficultyToColor(cls.difficulty),
                marginTop: "0px",
              }}
            >
              Course Difficulty: {cls.difficulty}
            </h4>
          ) : null}
          <div className="subclasses-parent">
            <h4 style={{ marginBottom: "5px" }}>Some classes in this area:</h4>
            {cls.links
              .slice(0, seeMore ? cls.links.length : 3)
              .map(({ text, url }, index) => (
                <WebsiteLink key={index} href={url} opensNewTab>
                  {text}
                </WebsiteLink>
              ))}
            {cls.links.length > 3 ? (
              <SeeMoreButton
                onClick={() => setSeeMore(!seeMore)}
                seeMore={seeMore}
              />
            ) : null}
          </div>
        </div>
        {cls.image ? (
          <img src={cls.image} className="box-image" alt={cls.name} />
        ) : null}
      </div>
    </div>
  )
}

export default _Class
