import { analyticsConfig } from '../config/analytics'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const initializeGA = () => {
  try {
    const { GOOGLE_ANALYTICS_MEASUREMENT_ID } = analyticsConfig
    
    if (!GOOGLE_ANALYTICS_MEASUREMENT_ID) {
      console.warn('Google Analytics Measurement ID not found')
      return
    }

    // Ensure we're in browser environment
    if (typeof window === 'undefined') return

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    
    // Define gtag function
    window.gtag = function() {
      window.dataLayer.push(arguments)
    }
    
    // Configure Google Analytics with error handling
    window.gtag('js', new Date())
    window.gtag('config', GOOGLE_ANALYTICS_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href
    })
  } catch (error) {
    console.error('Error initializing Google Analytics:', error)
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'engagement',
        event_label: eventName,
        ...parameters
      })
    }
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', analyticsConfig.GOOGLE_ANALYTICS_MEASUREMENT_ID, {
        page_path: pagePath,
        page_title: pageTitle || document.title
      })
    }
  } catch (error) {
    console.error('Error tracking page view:', error)
  }
}

export const trackUserInteraction = (action: string, element: string, value?: number) => {
  trackEvent('user_interaction', {
    action,
    element,
    value
  })
}

export const trackButtonClick = (buttonName: string) => {
  trackEvent('button_click', {
    button_name: buttonName
  })
}

export const trackFeatureUsage = (featureName: string) => {
  trackEvent('feature_usage', {
    feature_name: featureName
  })
}
