import React, { useEffect } from 'react'
import { initializeGA, trackPageView } from '../utils/analytics'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  useEffect(() => {
    // Wait for DOM to be fully loaded
    const initAnalytics = () => {
      try {
        // Initialize Google Analytics
        initializeGA()
        
        // Track initial page view
        trackPageView(window.location.pathname, document.title)
      } catch (error) {
        console.error('Error initializing analytics:', error)
      }
    }

    // Initialize after a short delay to ensure DOM is ready
    const timeoutId = window.setTimeout(initAnalytics, 100)
    
    // Track page visibility changes
    const handleVisibilityChange = () => {
      try {
        if (document.visibilityState === 'visible') {
          trackPageView(window.location.pathname, document.title)
        }
      } catch (error) {
        console.error('Error tracking visibility change:', error)
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      window.clearTimeout(timeoutId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return <>{children}</>
}

export default AnalyticsProvider
