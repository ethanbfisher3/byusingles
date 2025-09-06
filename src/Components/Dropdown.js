import React, { useState } from "react"

export default ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="dropdown-menu">
      <a onClick={() => setOpen(!open)} className="website-link-inverted">
        Toggle Dropdown
      </a>
      {open ? (
        <div className="dropdown-content">
          {children.map((child, index) => (
            <div key={index} className="dropdown-item">
              {child}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
