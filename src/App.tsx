import React, { useEffect, useState } from 'react'
import AnalyticsProvider from './components/AnalyticsProvider'
import { useAnalytics } from './hooks/useAnalytics'

const AppContent: React.FC = () => {
  const { trackButton, trackFeature, trackInteraction } = useAnalytics()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Ensure component is fully mounted before tracking
    const loadTimeout = window.setTimeout(() => {
      setIsLoaded(true)
      trackFeature('app_initialized')
    }, 200)

    return () => {
      window.clearTimeout(loadTimeout)
    }
  }, [trackFeature])

  const handleRobotIconClick = () => {
    if (!isLoaded) return
    trackButton('robot_icon')
    trackInteraction('click', 'robot_icon')
  }

  const handleCallToActionClick = () => {
    if (!isLoaded) return
    trackButton('cta_ready_to_create')
    trackInteraction('click', 'call_to_action')
  }

  const handleFeatureClick = (featureName: string) => {
    if (!isLoaded) return
    trackButton(`feature_${featureName}`)
    trackInteraction('click', `feature_${featureName}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-6">
            <div 
              className="w-16 h-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={handleRobotIconClick}
            >
              <i className="bi bi-robot text-white text-2xl"></i>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Hello! I'm Ridoy AI
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Expert AI-Powered Full Stack Software Engineer
            </p>
          </div>
          
          <div className="space-y-4 text-left">
            <div 
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              onClick={() => handleFeatureClick('experience')}
            >
              <i className="bi bi-check-circle-fill text-green-500 text-xl mt-1"></i>
              <div>
                <h3 className="font-semibold text-gray-800">20+ Years of Experience</h3>
                <p className="text-gray-600">Creating enterprise-grade applications and award-winning interfaces</p>
              </div>
            </div>
            
            <div 
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              onClick={() => handleFeatureClick('fullstack')}
            >
              <i className="bi bi-code-slash text-red-500 text-xl mt-1"></i>
              <div>
                <h3 className="font-semibold text-gray-800">Full Stack Expertise</h3>
                <p className="text-gray-600">Multiple programming languages, frameworks, and best practices</p>
              </div>
            </div>
            
            <div 
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              onClick={() => handleFeatureClick('design')}
            >
              <i className="bi bi-palette text-purple-500 text-xl mt-1"></i>
              <div>
                <h3 className="font-semibold text-gray-800">Design Excellence</h3>
                <p className="text-gray-600">Merging technical perfection with aesthetic mastery</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg">
            <p className="text-gray-700 font-medium mb-3">
              Ready to create something amazing? Let's build your next project together!
            </p>
            <button 
              className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-2 rounded-lg hover:from-red-700 hover:to-rose-700 transition-all duration-200 transform hover:scale-105"
              onClick={handleCallToActionClick}
            >
              Get Started
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center space-x-2">
            <i className="bi bi-lightning-charge text-red-500"></i>
            <span>Powered by Websparks AI</span>
          </p>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <AnalyticsProvider>
      <AppContent />
    </AnalyticsProvider>
  )
}

export default App
