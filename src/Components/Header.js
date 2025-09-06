import React, { useState } from "react"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <h3 className="header-text">
        <a href="/" className="header-link">
          BYUSINGLES
        </a>
      </h3>

      {/* Hamburger Menu Button */}
      <button
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        <span
          className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
        ></span>
        <span
          className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
        ></span>
        <span
          className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
        ></span>
      </button>

      <nav className={`nav ${isMobileMenuOpen ? "nav-open" : ""}`}>
        <div>
          <a href="/tips" className="nav-link" onClick={closeMobileMenu}>
            Finding a Date
          </a>
        </div>
        <div>
          <a href="/date-ideas" className="nav-link" onClick={closeMobileMenu}>
            Date Ideas
          </a>
        </div>
        <div>
          <a href="/plan-a-date" className="nav-link" onClick={closeMobileMenu}>
            Plan a Date
          </a>
        </div>
        <div>
          <a href="/events" className="nav-link" onClick={closeMobileMenu}>
            On-Campus Events
          </a>
        </div>
        <div>
          <a href="/clubs" className="nav-link" onClick={closeMobileMenu}>
            Clubs
          </a>
        </div>
        <div>
          <a href="/recipes" className="nav-link" onClick={closeMobileMenu}>
            Recipe Ideas
          </a>
        </div>
        <div>
          <a href="/contact" className="nav-link" onClick={closeMobileMenu}>
            Contact
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Header
