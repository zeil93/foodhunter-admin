import { useState, useEffect } from 'react'
import apiService from '../services/api'

export function useRestaurants(filters = {}) {
  const [restaurants, setRestaurants] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRestaurants = async (loadAll = true) => {
    try {
      setLoading(true)
      setError(null)
      
      if (loadAll) {
        // Загружаем все рестораны, получив сначала информацию о пагинации
        const firstPage = await apiService.restaurants.list({ ...filters, page: 1, page_size: 100 })
        
        if (firstPage.pagination && firstPage.pagination.total > 100) {
          // Если ресторанов больше 100, загружаем все страницы
          const allRestaurants = [...firstPage.items]
          const totalPages = firstPage.pagination.page_count
          
          for (let page = 2; page <= totalPages; page++) {
            const pageData = await apiService.restaurants.list({ ...filters, page, page_size: 100 })
            allRestaurants.push(...pageData.items)
          }
          
          setRestaurants(allRestaurants)
          setPagination({
            ...firstPage.pagination,
            page_size: allRestaurants.length,
            page_count: 1
          })
        } else {
          setRestaurants(firstPage.items || firstPage)
          setPagination(firstPage.pagination)
        }
      } else {
        // Загружаем только одну страницу
        const data = await apiService.restaurants.list(filters)
        setRestaurants(data.items || data)
        setPagination(data.pagination)
      }
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
    pagination,
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

