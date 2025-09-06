import React, { useState } from "react"
import { Link } from "wouter"

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
        <Link href="/" className="header-link">
          BYUSINGLES
        </Link>
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
          <Link href="/tips" className="nav-link" onClick={closeMobileMenu}>
            Finding a Date
          </Link>
        </div>
        <div>
          <Link
            href="/date-ideas"
            className="nav-link"
            onClick={closeMobileMenu}
          >
            Date Ideas
          </Link>
        </div>
        <div>
          <Link
            href="/plan-a-date"
            className="nav-link"
            onClick={closeMobileMenu}
          >
            Plan a Date
          </Link>
        </div>
        <div>
          <Link href="/events" className="nav-link" onClick={closeMobileMenu}>
            On-Campus Events
          </Link>
        </div>
        <div>
          <Link href="/clubs" className="nav-link" onClick={closeMobileMenu}>
            Clubs
          </Link>
        </div>
        <div>
          <Link href="/recipes" className="nav-link" onClick={closeMobileMenu}>
            Recipe Ideas
          </Link>
        </div>
        <div>
          <Link href="/contact" className="nav-link" onClick={closeMobileMenu}>
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
