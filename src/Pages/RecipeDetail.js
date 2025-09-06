import React from "react"
import { useRoute } from "wouter"
import recipes from "../data/Recipes"
import { timeString } from "../utils.js"

const RecipeDetail = () => {
  const [match, params] = useRoute("/recipes/:id")

  if (!match) return <div>Recipe not found</div>

  const recipeId = parseInt(params.id)
  const recipe = recipes[recipeId]

  if (!recipe) {
    return (
      <div className="section">
        <h1 className="section-title">Recipe Not Found</h1>
        <p>The recipe you're looking for doesn't exist.</p>
        <a href="/recipes" className="nav-link">
          ← Back to Recipes
        </a>
      </div>
    )
  }

  const ingredients = Object.keys(recipe.ingredients)
  const amounts = Object.values(recipe.ingredients)

  return (
    <div className="section">
      <div className="content">
        <a
          href="/recipes"
          className="nav-link"
          style={{ marginBottom: "20px", display: "inline-block" }}
        >
          ← Back to Recipe Ideas
        </a>

        {/* Main content: Left side content and right side image */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "50px",
            alignItems: "flex-start",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "50px",
          }}
        >
          {/* Left side: Recipe name, info, and ingredients */}
          <div
            style={{
              flex: "1",
              minWidth: "300px",
              maxWidth: "500px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                background: "var(--inverted-bg-color)",
                color: "var(--inverted-text-color)",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h1
                style={{
                  fontSize: "36px",
                  marginBottom: "30px",
                  textAlign: "left",
                  color: "var(--inverted-text-color)",
                }}
              >
                {recipe.name}
              </h1>

              {recipe.description ? (
                <div
                  style={{
                    marginBottom: "30px",
                    fontSize: "16px",
                    textAlign: "left",
                    lineHeight: "1.5",
                  }}
                >
                  {recipe.description.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              ) : null}

              {/* Recipe Info */}
              <div style={{ textAlign: "left" }}>
                <h3 style={{ margin: "0 0 10px 0" }}>Recipe Info</h3>
                <ul style={{ textAlign: "left", marginTop: "10px" }}>
                  <li style={{ marginBottom: "5px", fontSize: "16px" }}>
                    <strong>Cost:</strong> ${recipe.estimatedPrice}
                  </li>
                  <li style={{ fontSize: "16px" }}>
                    <strong>Time:</strong> {timeString(recipe.estimatedTime)}
                  </li>
                </ul>
              </div>

              {/* Ingredients */}
              <div style={{ textAlign: "left" }}>
                <h3 style={{ textAlign: "left", margin: "0 0 10px 0" }}>
                  Ingredients
                </h3>
                <ul style={{ textAlign: "left", marginTop: "10px" }}>
                  {ingredients.map((ingredient, index) => {
                    const amount = amounts[index]
                    return (
                      <li key={index} style={{ marginBottom: "5px" }}>
                        <strong>{ingredient}:</strong> {amount}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Right side: Image */}
          <div style={{ flex: "1", minWidth: "300px", maxWidth: "500px" }}>
            <img
              src={recipe.imgSrc}
              alt={recipe.name}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>

        {/* Instructions at the bottom left */}
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
          <div
            style={{
              background: "var(--inverted-bg-color)",
              color: "var(--inverted-text-color)",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ marginTop: "0" }}>Instructions</h3>
            <ol
              style={{
                textAlign: "left",
                marginTop: "15px",
              }}
            >
              {recipe.steps.map((step, index) => {
                return (
                  <li
                    key={index}
                    style={{
                      marginBottom: "15px",
                      lineHeight: "1.6",
                      fontSize: "16px",
                    }}
                  >
                    {step}
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail
