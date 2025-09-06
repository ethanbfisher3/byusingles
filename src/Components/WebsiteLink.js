import React from "react"

const WebsiteLink = ({
  href,
  style,
  opensNewTab,
  children,
  inverted,
  size,
}) => {
  var sizeClass = ""
  if (size === "small") sizeClass = "website-link-small"
  else if (size === "large") sizeClass = "website-link-large"
  return (
    <div
      style={{ margin: "5px 0px", ...style }}
      className={`${
        inverted ? "website-link-inverted" : "website-link"
      } ${sizeClass}`}
    >
      <a
        href={href}
        target={opensNewTab ? "_blank" : ""}
        rel={opensNewTab ? "noreferrer" : ""}
      >
        {children}
      </a>
    </div>
  )
}

export default WebsiteLink
