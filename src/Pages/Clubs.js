import React from "react"
import clubs from "../data/Clubs.js"
import Club from "../Components/Club.js"

const Clubs = () => {
  return (
    <div className="section">
      <h1 className="section-title">Clubs to get GIRLS</h1>
      <div className="page-description">
        <h4>
          Clubs are a great way to get to know people who have similar interests
          as you. Listed below are some clubs that can help you find the girl of
          your dreams.
          {/* For a list of all BYU clubs, click&nbsp;
          <a
            href="https://clubs.byu.edu/p/home"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--default-text-color)" }}
          >
            Here
          </a> */}
        </h4>
      </div>
      <div className="box-parent">
        {clubs
          ? clubs
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((club, index) => {
                return <Club key={index} club={club} />
              })
          : "Loading..."}
      </div>
    </div>
  )
}

export default Clubs
