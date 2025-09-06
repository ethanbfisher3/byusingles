import React from "react"
import WebsiteLink from "../Components/WebsiteLink"

const Tips = () => {
  return (
    <div className="tips" style={{ fontSize: "18px" }}>
      <p>
        "And their young men and their daughters became exceedingly fair." (3
        Nephi 2:16)
      </p>
      <div className="get-real">
        <div>
          <h1 className="section-title" style={{ margin: "40px" }}>
            Tips for Finding Girls
          </h1>
          <p style={{ paddingBottom: "0px", textAlign: "left" }}>
            Welcome to your ultimate guide for navigating the Provo dating
            scene! Whether you're a fresh RM looking to find your eternal
            companion or a seasoned student ready to take your dating game to
            the next level, we've got you covered. Our carefully curated tips
            and strategies are designed to help you build meaningful
            connections, boost your confidence, and increase your chances of
            finding that special someone. From understanding the unique dynamics
            of Provo's dating culture to mastering the art of conversation and
            making lasting impressions, these proven techniques will give you
            the edge you need in the competitive world of college dating.
            Remember, finding love isn't just about luck—it's about being
            prepared, staying true to yourself, and putting in the effort to
            create genuine connections. Let's help you find your happily ever
            after!
          </p>
        </div>
        <div className="tips-section">
          <div id="tip-1">
            <h2 style={{ margin: "20px 0px" }}>Tip 1: Go to events</h2>
            <p>
              BYU is full of events for boys and girls to get out of the
              apartment and get to know each other! For example:
            </p>
            <ul className="byu-events-list">
              <li>Ward Activites (Family Home Evening, Ward Prayer)</li>
              <li>
                College Events (Engineering Activites, Foreign Language Events,
                etc.)
              </li>
              <li>YServe Events</li>
              <li>Clubs</li>
            </ul>
            <p>
              For the full list of local clubs and events, click the links
              below!
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
                gap: "10px",
              }}
            >
              <WebsiteLink inverted href="/clubs">
                Clubs
              </WebsiteLink>
              <WebsiteLink inverted href="/events">
                On-Campus Events
              </WebsiteLink>
            </div>
          </div>
          {/* <div id="tip-2">
            <h2 style={{ margin: "20px 0px" }}>Tip 2: Smart Class Choices</h2>
            <p>
              BYU has a plethora of classes. Obviously, lots of the ones you are
              taking are major-specific. Depending on your major, that could
              mean you're already in classes with lots of cuties, or you're in
              Computer Science and surrounded by boy nerds. However, despite
              having a major without girls, here's a list of the best classes to
              find cute girls to date.
            </p>
            <div style={{ marginTop: "12px" }}>
              <WebsiteLink inverted href="/classes">
                Best Classes
              </WebsiteLink>
            </div>
          </div> */}
          <div id="tip-2">
            <h2 style={{ margin: "20px 0px" }}>Tip 2: Referrals!</h2>
            <p>
              If you're a returned missionary, you probably know what we mean
              when we say <strong>work with members</strong>. You aren't the
              only one that has to be looking for girls for you. Your roommates,
              close friends, and family can all be looking for girls that you
              can date.
            </p>
            <p style={{ marginTop: "20px" }}>
              Here are some ways to get referrals:
            </p>
            <ul className="referral-list">
              <li>
                <strong>Classmates</strong>: Ask friends in your classes about
                their dating lives. See if they could get you in touch with a
                friend of theirs, their girlfriend's roommates, coworkers, etc.
              </li>
              <li style={{ margin: "10px 0px" }}>
                <strong>Roommates</strong>: Ask your roommates about their
                friends. Most likely they have some friends who are girls that
                you could hang out with. Maybe you date them, or you begin to
                ask those girls who you could date. Simple!
              </li>
              <li>
                <strong>Family</strong>: If you have family in the Utah area,
                you're in luck! Your family has their own ward to go to, and
                many times there are girls at college from Utah who go to church
                back with their families. You could try going to church with
                your families or asking your family if there are cute girls in
                their wards.
              </li>
            </ul>
          </div>
          <div id="tip-3">
            <h2 style={{ margin: "20px 0px" }}>Tip 3: Mutual</h2>
            <p>
              There's a reason Mutual is so popular. It works! It's like getting
              media referrals through Facebook on the mission. You're
              immediately put in an environment where there are girls wanting to
              date. You can easily get dates with cute girls and find your
              soulmate after just a few minutes making an account and looking
              around.
            </p>
            <div style={{ marginTop: "12px" }}>
              <WebsiteLink inverted href="https://www.mutual.app/">
                Check out Mutual!
              </WebsiteLink>
            </div>
          </div>
          <div id="tip-4">
            <h2 style={{ margin: "20px 0px" }}>Tip 4: Be Confident!</h2>
            <p>
              Confidence plays a crucial role in attracting girls at BYU. It
              shows girls that you believe in yourself, that you value yourself
              as a son of God and that you know how to treat a woman.
            </p>
            <br />
            <p>
              One thing that is important to note is that confidence is not
              cockiness or pride. Never at any time should you act in such a
              way, because you will cause the girl to be uninterested in you,
              likely for the rest of your life.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tips
