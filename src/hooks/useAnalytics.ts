import { useCallback } from 'react'
import { trackEvent, trackButtonClick, trackFeatureUsage, trackUserInteraction } from '../utils/analytics'

export const useAnalytics = () => {
  const track = useCallback((eventName: string, parameters?: Record<string, any>) => {
    trackEvent(eventName, parameters)
  }, [])

  const trackButton = useCallback((buttonName: string) => {
    trackButtonClick(buttonName)
  }, [])

  const trackFeature = useCallback((featureName: string) => {
    trackFeatureUsage(featureName)
  }, [])

  const trackInteraction = useCallback((action: string, element: string, value?: number) => {
    trackUserInteraction(action, element, value)
  }, [])

  const trackCustomEvent = useCallback((eventName: string, customData: Record<string, any>) => {
    trackEvent(eventName, customData)
  }, [])

  return {
    track,
    trackButton,
    trackFeature,
    trackInteraction,
    trackCustomEvent
  }
}
