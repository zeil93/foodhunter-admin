import { useState, useEffect } from 'react'
import apiService from '../services/api'

export function useDishes(filters = {}) {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDishes = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiService.dishes.list(filters)
      setDishes(data.data || data)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching dishes:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDishes()
  }, [JSON.stringify(filters)])

  const createDish = async (dishData) => {
    try {
      const newDish = await apiService.dishes.create(dishData)
      setDishes(prev => [...prev, newDish])
      return newDish
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateDish = async (id, dishData) => {
    try {
      const updatedDish = await apiService.dishes.update(id, dishData)
      setDishes(prev => 
        prev.map(dish => 
          dish.id === id ? updatedDish : dish
        )
      )
      return updatedDish
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteDish = async (id) => {
    try {
      await apiService.dishes.delete(id)
      setDishes(prev => prev.filter(dish => dish.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const refresh = () => {
    fetchDishes()
  }

  return {
    dishes,
    loading,
    error,
    createDish,
    updateDish,
    deleteDish,
    refresh,
  }
}

export function useDish(id) {
  const [dish, setDish] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchDish = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await apiService.dishes.get(id)
        setDish(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching dish:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDish()
  }, [id])

  return {
    dish,
    loading,
    error,
  }
}

export function useCategoryDishes(categoryId) {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!categoryId) return

    const fetchDishes = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await apiService.dishes.getByCategory(categoryId)
        setDishes(data.data || data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching category dishes:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDishes()
  }, [categoryId])

  return {
    dishes,
    loading,
    error,
  }
}

