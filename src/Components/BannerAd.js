import React from "react"
import "./BannerAd.css"

const BannerAd = ({ position = "left" }) => {
  const adContent = [
    "🔥 Find Your Perfect Match!",
    "💕 BYU Dating App Premium",
    "🎯 95% Success Rate!",
    "💎 Upgrade to Pro Today!",
    "❤️ Join Thousands of Singles!",
    "🌟 Get More Matches Now!",
    "💖 Premium Dating Features",
    "🎉 Special Student Discount!",
    "💫 Find Love at BYU!",
    "🔥 Hot Singles Near You!",
  ]

  const randomAd = adContent[Math.floor(Math.random() * adContent.length)]

  return (
    <div className={`banner-ad banner-ad-${position}`}>
      <div className="banner-ad-content">
        <div className="banner-ad-header">
          <span className="banner-ad-label">ADVERTISEMENT</span>
        </div>
        <div className="banner-ad-body">
          <div className="banner-ad-text">{randomAd}</div>
          <div className="banner-ad-cta">Click Here!</div>
        </div>
        <div className="banner-ad-footer">
          <span className="banner-ad-size">160x600</span>
        </div>
      </div>
    </div>
  )
}

export default BannerAd
