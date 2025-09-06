import React from "react"
import WebsiteLink from "../Components/WebsiteLink"

const Home = () => {
  return (
    <div className="home-content">
      <div className="information">
        <div className="image-container">
          {/* <img src="https://www.gideonphoto.com/blog/wp-content/uploads/2019/03/slc-temple-wedding-photos5866.jpg" /> */}
          <img alt="BYU campus background" src="/images/home_background.png" />
          <div className="image-overlay" />
        </div>
        <div className="text-parent">
          <p>
            Are you a student in Provo, Utah struggling to think of good date
            ideas? We're here to help. BYUSINGLES is designed to help you think
            of the best date ideas of all time.
          </p>
          <WebsiteLink href="/date-ideas">
            What are some good date ideas?
          </WebsiteLink>
          <WebsiteLink href="/plan-a-date">Plan an Upcoming Date</WebsiteLink>
          <p>...Or are you still single?</p>
          <WebsiteLink href="/tips">Tips for finding a hot date</WebsiteLink>
          <WebsiteLink href="/events">
            Events for finding a hot date
          </WebsiteLink>
        </div>
        <div className="dating-text-content-parent">
          <h3 className="dating-title-text">BYUSINGLES</h3>
          <p
            className="dating-tagline-text"
            style={{
              textAlign: "center",
              fontStyle: "italic",
              marginBottom: "20px",
              fontSize: "1.2em",
              fontWeight: "bold",
            }}
          >
            Bringing You Unforgettable Sparks, Inspiring New Genuine Love Every
            Second
          </p>
          <p className="dating-info-text">
            BYUSINGLES is a tool designed to help young single adults in Provo,
            Utah find hot dates and find the best places to take those hot
            dates. We've compiled a list of popular places in Provo and
            surrounding areas that are sure to help you have a great date. Also,
            if you enjoy cooking for a date, we have also made a list of great
            recipes to try.
          </p>
          <div
            className="row"
            style={{ justifyContent: "center", marginTop: "20px", gap: "20px" }}
          >
            <WebsiteLink inverted href="/date-ideas">
              Date Ideas
            </WebsiteLink>
            <WebsiteLink inverted href="/plan-a-date">
              Plan Your Date
            </WebsiteLink>
            <WebsiteLink inverted href="/recipes">
              Recipe Ideas
            </WebsiteLink>
          </div>
          <p className="dating-info-text" style={{ marginTop: "20px" }}>
            Additionally, if you're <strong>SINGLE</strong>, we've compiled many
            ways for you to go to and find the girl of your dreams!
          </p>
          <div
            className="row"
            style={{ justifyContent: "center", marginTop: "20px", gap: "20px" }}
          >
            <WebsiteLink inverted href="/events">
              Events in Provo
            </WebsiteLink>
            {/* <WebsiteLink inverted href="/classes">
              Classes @ BYU
            </WebsiteLink> */}
            <WebsiteLink inverted href="/clubs">
              Clubs for Provo Students
            </WebsiteLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
