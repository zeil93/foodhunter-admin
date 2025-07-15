import { useState, useEffect } from 'react'
import apiService from '../services/api'

export function useRestaurants(filters = {}) {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRestaurants = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiService.restaurants.list(filters)
      setRestaurants(data.items || data)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching restaurants:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRestaurants()
  }, [JSON.stringify(filters)])

  const createRestaurant = async (restaurantData) => {
    try {
      const newRestaurant = await apiService.restaurants.create(restaurantData)
      setRestaurants(prev => [...prev, newRestaurant])
      return newRestaurant
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateRestaurant = async (id, restaurantData) => {
    try {
      const updatedRestaurant = await apiService.restaurants.update(id, restaurantData)
      setRestaurants(prev => 
        prev.map(restaurant => 
          restaurant.id === id ? updatedRestaurant : restaurant
        )
      )
      return updatedRestaurant
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteRestaurant = async (id) => {
    try {
      await apiService.restaurants.delete(id)
      setRestaurants(prev => prev.filter(restaurant => restaurant.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const refresh = () => {
    fetchRestaurants()
  }

  return {
    restaurants,
    loading,
    error,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    refresh,
  }
}

export function useRestaurant(id) {
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchRestaurant = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await apiService.restaurants.get(id)
        setRestaurant(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching restaurant:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurant()
  }, [id])

  return {
    restaurant,
    loading,
    error,
  }
}

