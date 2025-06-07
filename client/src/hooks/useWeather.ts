import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { NZ_REGIONS } from '@/lib/constants';

interface WeatherDay {
  day: string;
  temp: number;
  icon: string;
  conditions: string;
  windSpeed?: number;
  humidity?: number;
}

interface WeatherImpact {
  summary: string;
  severity: 'low' | 'medium' | 'high';
  affectedSites: string[];
  recommendations: string[];
  materialImpacts: {
    type: string;
    effect: string;
  }[];
}

export function useWeather() {
  const [location, setLocation] = useState('Papamoa, Bay of Plenty');
  const [currentWeather, setCurrentWeather] = useState({
    temp: 19,
    feelsLike: 17,
    description: 'Light rain expected from 2PM - 5PM',
    icon: 'fa-cloud-rain',
    humidity: 75,
    windSpeed: 12,
    windDirection: 'SW',
    precipitation: 60,
    uvIndex: 4
  });
  
  const [forecast, setForecast] = useState<WeatherDay[]>([
    { day: 'TODAY', temp: 19, icon: 'fa-cloud-rain', conditions: 'Light Rain', windSpeed: 12, humidity: 75 },
    { day: 'THU', temp: 22, icon: 'fa-cloud-sun', conditions: 'Partly Cloudy', windSpeed: 8, humidity: 65 },
    { day: 'FRI', temp: 24, icon: 'fa-sun', conditions: 'Sunny', windSpeed: 5, humidity: 55 },
    { day: 'SAT', temp: 23, icon: 'fa-cloud', conditions: 'Cloudy', windSpeed: 10, humidity: 60 },
    { day: 'SUN', temp: 20, icon: 'fa-cloud-showers-heavy', conditions: 'Heavy Rain', windSpeed: 15, humidity: 85 }
  ]);
  
  const [weatherImpact, setWeatherImpact] = useState(
    'Consider rescheduling exterior painting at the Mount Property site'
  );
  
  const [detailedImpact, setDetailedImpact] = useState<WeatherImpact>({
    summary: 'Precipitation and wind may affect several work sites',
    severity: 'medium',
    affectedSites: ['Mount Maunganui Property', 'Tauranga Commercial Build'],
    recommendations: [
      'Reschedule exterior painting for Friday',
      'Ensure all materials are properly covered',
      'Check drainage at the Tauranga site'
    ],
    materialImpacts: [
      { type: 'Paint', effect: 'Extended drying time needed' },
      { type: 'Concrete', effect: 'Cover fresh pours to protect from rain' },
      { type: 'Timber', effect: 'Ensure proper storage to prevent moisture absorption' }
    ]
  });
  
  const [availableLocations] = useState(NZ_REGIONS);
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to update location and refetch weather data
  const updateLocation = (newLocation: string) => {
    setLocation(newLocation);
    fetchWeather(newLocation);
  };
  
  // In a real app, we would fetch weather data from an API
  const fetchWeather = async (selectedLocation = location) => {
    setIsLoading(true);
    try {
      // This would be replaced with actual API call in production
      // const response = await fetch(`/api/weather?location=${selectedLocation}`);
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Process data and update state
      console.log('Weather data would be fetched here');
      
      // For demo purposes we're using mock data
      // In a real application, this would be populated from API response
      
      // Simulate different weather for different locations
      if (selectedLocation.includes('Auckland')) {
        setCurrentWeather(prev => ({
          ...prev,
          temp: 22,
          description: 'Scattered showers throughout the day',
          icon: 'fa-cloud-sun-rain'
        }));
      } else if (selectedLocation.includes('Wellington')) {
        setCurrentWeather(prev => ({
          ...prev,
          temp: 16,
          description: 'Strong winds with occasional showers',
          icon: 'fa-wind'
        }));
      }
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Generate AI-powered weather impact analysis with robust error handling
  const generateWeatherImpactAnalysis = async (projectType: string) => {
    try {
      setIsLoading(true);
      
      // Generate a concise weather condition description from current weather
      const weatherCondition = `${currentWeather.description} with ${currentWeather.temp}°C temperature, ${currentWeather.humidity}% humidity, and ${currentWeather.windSpeed}km/h winds`;
      
      // Call the AI endpoint to generate weather impact analysis
      const startDate = new Date().toISOString().split('T')[0];
      const duration = 14; // Two weeks
      
      // Use a timeout to prevent hanging requests
      const timeout = 10000; // 10 seconds
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      try {
        const result = await apiRequest<{ analysis: string }>('/api/ai/weather-impact', {
          method: 'POST',
          body: JSON.stringify({
            projectType,
            location,
            weatherCondition,
            startDate,
            duration
          }),
          signal: controller.signal as any
        });
        
        clearTimeout(timeoutId);
        
        // Update the weather impact with AI-generated analysis
        if (result && result.analysis) {
          // Use the first line for the summary
          const summary = result.analysis.split('\n')[0]; 
          setWeatherImpact(summary);
          
          // Update detailed impact based on analysis
          try {
            // Extract severity from the content
            const severityMatch = result.analysis.match(/severity[:\s]*(low|medium|high)/i);
            const newSeverity = severityMatch ? 
              severityMatch[1].toLowerCase() as 'low' | 'medium' | 'high' : 
              detailedImpact.severity;
            
            setDetailedImpact(prev => ({
              ...prev,
              summary: summary,
              severity: newSeverity
            }));
          } catch (parseError) {
            console.error('Error parsing analysis result:', parseError);
          }
        }
        
        return result?.analysis || '';
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        
        if (fetchError.name === 'AbortError') {
          console.warn('Weather impact analysis request timed out');
          throw new Error('Request timed out. Please try again.');
        }
        
        throw fetchError;
      }
    } catch (error: any) {
      console.error('Error generating weather impact analysis:', error);
      
      // Provide a helpful error message based on the error type
      const errorMessage = error.message || 'Failed to generate analysis. Please try again later.';
      
      // Return a user-friendly message with the error
      return `Unable to generate analysis: ${errorMessage}. This could be due to network issues or service unavailability.`;
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchWeather();
  }, []);
  
  return {
    location,
    availableLocations,
    currentWeather,
    forecast,
    weatherImpact,
    detailedImpact,
    isLoading,
    updateLocation,
    generateWeatherImpactAnalysis
  };
}
