import React from "react"
import ReactDOM from "react-dom/client"
import Home from "./Pages/Home"
import reportWebVitals from "./reportWebVitals"
import { Route } from "wouter"
import DateIdeas from "./Pages/DateIdeas"
import PlanADate from "./Pages/PlanADate"
import Tips from "./Pages/Tips"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Contact from "./Pages/Contact"
import EventsPage from "./Pages/EventsPage"
import RecipesPage from "./Pages/RecipesPage"
import RecipeDetail from "./Pages/RecipeDetail"
import AdManager from "./Components/AdManager"

import "./styles/styles.css"
import "./styles/boxes.css"
import "./styles/tips.css"
import "./styles/home.css"
import Clubs from "./Pages/Clubs"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Header />
    <AdManager />
    <Route path="/" component={Home} />
    <Route path="/date-ideas" component={DateIdeas} />
    <Route path="/plan-a-date" component={PlanADate} />
    <Route path="/tips" component={Tips} />
    <Route path="/contact" component={Contact} />
    <Route path="/events" component={EventsPage} />
    <Route path="/recipes/:id" component={RecipeDetail} />
    <Route path="/recipes" component={RecipesPage} />
    <Route path="/clubs" component={Clubs} />
    {/* <Route path="*" component={() => <h1>404 Not Found</h1>} /> */}
    <Footer />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
