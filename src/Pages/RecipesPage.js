import React, { useState } from "react"
import recipes from "../data/Recipes"
import Recipe from "../Components/Recipe"
import config from "../config"

const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"]

const RecipesPage = () => {
  const [categoryChecked, setCategoryChecked] = useState(
    Array(categories.length).fill(true)
  )
  const [maxPrice, setMaxPrice] = useState(20)
  const [maxTime, setMaxTime] = useState(120) // 120 minutes = 2 hours

  const toggleCategory = (index) => {
    categoryChecked[index] = !categoryChecked[index]
    setCategoryChecked([...categoryChecked])
  }

  const filteredRecipes = recipes
    .filter((recipe) => {
      if (recipe.estimatedPrice > maxPrice) return false
      if (recipe.estimatedTime > maxTime) return false
      return recipe.categories.some(
        (type) => categoryChecked[categories.indexOf(type)]
      )
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div
      className={`box-section ${
        config.useSideFilters ? "box-section-narrow" : ""
      }`}
    >
      <h1 className="section-title">Recipe Ideas</h1>
      <div className="page-description">
        <h4>
          Here are a list of a few recipes that you can cook up for a date.
          They're fast, simple, and affordable. We're sure they will help girls
          fall in love with you.
        </h4>
      </div>
      <div className={`filter-section${config.useSideFilters ? "-side" : ""}`}>
        <div
          className={`filter-parent${
            config.useSideFilters ? " filter-padding" : ""
          }`}
        >
          <div className="box-categories">
            <h3>Categories</h3>
            <div className="categories-parent" style={{ maxWidth: "180px" }}>
              {categories.map((category, index) => (
                <div key={index} style={{ width: "90px" }}>
                  <input
                    type="checkbox"
                    className="category-checkbox"
                    checked={categoryChecked[index]}
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
          <div className="recipe-max-price">
            <h3>Max Price</h3>
            <div className="slider-container">
              <h4 className="price-slider-label">
                Up to ${maxPrice} {maxPrice === 0 ? "(Free Only)" : ""}
              </h4>
              <input
                type="range"
                min="0"
                max="20"
                step="2"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="slider recipe-price-slider"
              />
            </div>
          </div>
          <div className="recipe-max-time">
            <h3>Max Time</h3>
            <div className="slider-container">
              <h4 className="time-slider-label">Up to {maxTime} minutes</h4>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={maxTime}
                onChange={(e) => setMaxTime(Number(e.target.value))}
                className="slider recipe-time-slider"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="box-parent">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => {
            // Find the original index in the recipes array
            const originalIndex = recipes.findIndex(
              (r) => r.name === recipe.name
            )
            return (
              <Recipe key={originalIndex} {...recipe} index={originalIndex} />
            )
          })
        ) : (
          <h2>No recipes found.</h2>
        )}
      </div>
    </div>
  )
}

export default RecipesPage
