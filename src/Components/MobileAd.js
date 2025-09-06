import React, { useState, useEffect } from "react"
import "./MobileAd.css"

const MobileAd = ({ type = "banner", position = "bottom", onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentAd, setCurrentAd] = useState(0)

  const adContent = [
    {
      title: "🔥 Find Your Perfect Match!",
      subtitle: "Join thousands of BYUSINGLES",
      cta: "Start Dating Now",
      icon: "💕",
    },
    {
      title: "💎 Premium Dating Features",
      subtitle: "Get more matches & better dates",
      cta: "Upgrade to Pro",
      icon: "⭐",
    },
    {
      title: "🎯 95% Success Rate!",
      subtitle: "Proven dating strategies",
      cta: "Learn More",
      icon: "❤️",
    },
    {
      title: "🎉 Special Student Discount!",
      subtitle: "50% off for BYU students",
      cta: "Get Discount",
      icon: "🎓",
    },
    {
      title: "💫 Find Love at BYU!",
      subtitle: "Local dating made easy",
      cta: "Browse Singles",
      icon: "🏫",
    },
  ]

  // Rotate ads every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % adContent.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [adContent.length])

  // Show ad after a delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const ad = adContent[currentAd]

  const renderBannerAd = () => (
    <div className={`mobile-ad mobile-banner mobile-banner-${position}`}>
      <div className="mobile-ad-content">
        <div className="mobile-ad-header">
          <span className="mobile-ad-label">SPONSORED</span>
          <button
            className="mobile-ad-close"
            onClick={() => {
              setIsVisible(false)
              if (onClose) onClose()
            }}
          >
            ×
          </button>
        </div>
        <div className="mobile-ad-body">
          <div className="mobile-ad-icon">{ad.icon}</div>
          <div className="mobile-ad-text">
            <div className="mobile-ad-title">{ad.title}</div>
            <div className="mobile-ad-subtitle">{ad.subtitle}</div>
          </div>
          <button className="mobile-ad-cta">{ad.cta}</button>
        </div>
      </div>
    </div>
  )

  const renderInterstitialAd = () => (
    <div
      className={`mobile-ad mobile-interstitial ${isVisible ? "visible" : ""}`}
    >
      <div className="mobile-interstitial-content">
        <div className="mobile-interstitial-header">
          <span className="mobile-ad-label">SPONSORED CONTENT</span>
          <button
            className="mobile-ad-close"
            onClick={() => setIsVisible(false)}
          >
            ×
          </button>
        </div>
        <div className="mobile-interstitial-body">
          <div className="mobile-interstitial-icon">{ad.icon}</div>
          <h2 className="mobile-interstitial-title">{ad.title}</h2>
          <p className="mobile-interstitial-subtitle">{ad.subtitle}</p>
          <button className="mobile-interstitial-cta">{ad.cta}</button>
          <button
            className="mobile-interstitial-skip"
            onClick={() => setIsVisible(false)}
          >
            Skip Ad
          </button>
        </div>
      </div>
    </div>
  )

  const renderNativeAd = () => (
    <div className="mobile-ad mobile-native">
      <div className="mobile-native-content">
        <div className="mobile-native-header">
          <span className="mobile-ad-label">SPONSORED</span>
        </div>
        <div className="mobile-native-body">
          <div className="mobile-native-icon">{ad.icon}</div>
          <div className="mobile-native-text">
            <div className="mobile-native-title">{ad.title}</div>
            <div className="mobile-native-subtitle">{ad.subtitle}</div>
          </div>
          <button className="mobile-native-cta">{ad.cta}</button>
        </div>
      </div>
    </div>
  )

  if (!isVisible) return null

  switch (type) {
    case "interstitial":
      return renderInterstitialAd()
    case "native":
      return renderNativeAd()
    case "banner":
    default:
      return renderBannerAd()
  }
}

export default MobileAd
