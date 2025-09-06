import React from "react"

const Contact = () => (
  <div
    className="section"
    style={{
      minHeight: "calc(100vh - 300px)",
      padding: "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <h1 className="section-title">Thank you for visiting BYUSINGLES!</h1>
    <p style={{ fontSize: "18px", maxWidth: "75vw" }}>
      If you have questions or would like to see something in the website,
      please email{" "}
      <a href="mailto:byudating@outlook.com">byudating@outlook.com</a>
    </p>
  </div>
)
export default Contact
