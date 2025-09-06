import React from "react"
import classes from "../data/Classes.js"
import _Class from "../Components/_Class.js"

const Classes = () => {
  return (
    <div className="section">
      <h1 className="section-title">Classes to get GIRLS</h1>
      <div className="page-description">
        <h4>
          Some classes at BYU are better than others for finding a girl to date.
          Here are some that we think could help you. For a list of all BYU
          classes, click&nbsp;
          <a
            href="https://commtech.byu.edu/noauth/classSchedule/index.php"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--default-text-color)" }}
          >
            Here
          </a>
        </h4>
      </div>
      <div className="box-parent">
        {classes
          ? classes
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((cls, index) => {
                return <_Class cls={cls} key={index} />
              })
          : "Loading..."}
      </div>
    </div>
  )
}

export default Classes
