import { useState, useEffect } from 'react'
import apiService from '../services/api'

export function useDashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await apiService.reports.dashboard()
        setDashboardData(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching dashboard data:', err)
        // Fallback to mock data if API fails
        setDashboardData({
          stats: {
            restaurants: { count: 156, change: '+12%' },
            dishes: { count: 2847, change: '+23%' },
            users: { count: 12459, change: '+8%' },
            visits: { count: 8921, change: '+15%' }
          },
          recentRestaurants: [],
          recentDishes: []
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const refresh = () => {
    fetchDashboardData()
  }

  return {
    dashboardData,
    loading,
    error,
    refresh,
  }
}

