import React, { useState, useEffect } from "react"
import BannerAd from "./BannerAd"
import MobileAd from "./MobileAd"
import "./AdManager.css"

const AdManager = ({ pageType = "general" }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [showInterstitial, setShowInterstitial] = useState(false)
  const [hasShownInterstitial, setHasShownInterstitial] = useState(false)
  const [currentPage, setCurrentPage] = useState("general")
  const [bannerAdClosed, setBannerAdClosed] = useState(false)

  // Check if device is mobile and detect current page
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    const detectCurrentPage = () => {
      const path = window.location.pathname
      if (path === "/" || path === "") {
        setCurrentPage("home")
      } else if (path === "/date-ideas") {
        setCurrentPage("date-ideas")
      } else if (path === "/recipes" || path.startsWith("/recipes/")) {
        setCurrentPage("recipes")
      } else if (path === "/events") {
        setCurrentPage("events")
      } else {
        setCurrentPage("general")
      }
    }

    checkMobile()
    detectCurrentPage()

    window.addEventListener("resize", checkMobile)
    window.addEventListener("popstate", detectCurrentPage)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("popstate", detectCurrentPage)
    }
  }, [])

  // Show interstitial ad only once per session on first page load
  useEffect(() => {
    // Check if we've already shown the interstitial in this session
    const hasShown = sessionStorage.getItem("hasShownInterstitial")

    if (!hasShown && !hasShownInterstitial) {
      // Show interstitial after a 3 second delay for better UX
      const timer = setTimeout(() => {
        setShowInterstitial(true)
        setHasShownInterstitial(true)
        sessionStorage.setItem("hasShownInterstitial", "true")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [hasShownInterstitial])

  // Close interstitial
  const closeInterstitial = () => {
    setShowInterstitial(false)
  }

  // Handle banner ad close
  const handleBannerAdClose = () => {
    setBannerAdClosed(true)
    // Add CSS class to body to adjust spacing
    document.body.classList.add("banner-ad-closed")
  }

  // Different ad strategies based on page type
  const getAdStrategy = () => {
    switch (currentPage) {
      case "home":
        return {
          banner: false, // No banner ads on home page
          native: false, // No native ads on home page
          interstitial: false, // No interstitial ads on home page
        }
      case "date-ideas":
        return {
          banner: true,
          native: true,
          interstitial: showInterstitial,
        }
      case "recipes":
        return {
          banner: true,
          native: true,
          interstitial: showInterstitial, // Show on first visit to any page
        }
      case "events":
        return {
          banner: true,
          native: true,
          interstitial: showInterstitial,
        }
      default:
        return {
          banner: true,
          native: true,
          interstitial: showInterstitial,
        }
    }
  }

  const strategy = getAdStrategy()

  // Add/remove banner-ads-present class to body based on banner ad visibility
  useEffect(() => {
    if (!isMobile && strategy.banner) {
      document.body.classList.add("banner-ads-present")
    } else {
      document.body.classList.remove("banner-ads-present")
    }
  }, [isMobile, strategy.banner])

  // Add/remove home-page class to body for CSS targeting
  useEffect(() => {
    if (currentPage === "home") {
      document.body.classList.add("home-page")
    } else {
      document.body.classList.remove("home-page")
    }
  }, [currentPage])

  return (
    <>
      {/* Desktop Banner Ads */}
      {!isMobile && strategy.banner && (
        <>
          <BannerAd position="left" />
          <BannerAd position="right" />
        </>
      )}

      {/* Mobile Ads */}
      {isMobile && (
        <>
          {/* Bottom Banner Ad - Always show on mobile */}
          {strategy.banner && !bannerAdClosed && (
            <MobileAd
              type="banner"
              position="bottom"
              onClose={handleBannerAdClose}
            />
          )}

          {/* Native Ad - Show in content areas */}
          {strategy.native && (
            <div className="mobile-native-ad-container">
              <MobileAd type="native" />
            </div>
          )}

          {/* Interstitial Ad - Show based on frequency */}
          {strategy.interstitial && showInterstitial && (
            <MobileAd type="interstitial" />
          )}
        </>
      )}
    </>
  )
}

export default AdManager
