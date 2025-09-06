import React from "react"
import { timeString } from "../utils.js"

const Recipe = (props) => {
  const ingredients = Object.keys(props.ingredients)
  const amounts = Object.values(props.ingredients)
  const isListView = !props.showFullDetails

  return (
    <div className="box">
      <div className="box-top">
        <h2 className="box-title">
          {isListView ? (
            <a
              href={`/recipes/${props.index}`}
              style={{
                textDecoration: "underline",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              {props.name}
            </a>
          ) : (
            props.name
          )}
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
          <div className="small-information">
            <div className="pricing">
              <strong>Cost</strong>: ${props.estimatedPrice}
            </div>
            <div className="estimated-time">
              <strong>Estimated Time</strong>: {timeString(props.estimatedTime)}
            </div>
            {isListView && (
              <div style={{ marginTop: "15px" }}>
                <a
                  href={`/recipes/${props.index}`}
                  className="website-link-inverted"
                  style={{ textDecoration: "none" }}
                >
                  View Recipe
                </a>
              </div>
            )}
            {!isListView && (
              <>
                <div className="ingredients">
                  <h4 style={{ margin: "10px 0px" }}>Ingredients:</h4>
                  <ul className="box-times">
                    {ingredients.map((ingredient, index) => {
                      const amount = amounts[index]
                      return (
                        <li key={index}>
                          {ingredient}: {amount}
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className="steps">
                  <h4 style={{ marginBottom: "10px" }}>Steps:</h4>
                  <ol className="box-times">
                    {props.steps.map((step, index) => {
                      return <li key={index}>{step}</li>
                    })}
                  </ol>
                </div>
              </>
            )}
          </div>
        </div>
        <img src={props.imgSrc} alt="" className="box-image" />
      </div>
    </div>
  )
}

export default Recipe
