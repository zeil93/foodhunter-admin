import { useState, useEffect } from 'react'
import apiService from '../services/api'

export function useMenus(filters = {}) {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMenus = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Если передан restaurant_id, используем специальный эндпоинт для получения меню ресторана
      if (filters.restaurant_id) {
        const data = await apiService.menus.getByRestaurant(filters.restaurant_id)
        setMenus(data.items || data)
      } else {
        const data = await apiService.menus.list(filters)
        setMenus(data.items || data)
      }
    } catch (err) {
      setError(err.message)
      console.error('Error fetching menus:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenus()
  }, [JSON.stringify(filters)])

  const createMenu = async (menuData) => {
    try {
      const newMenu = await apiService.menus.create(menuData)
      setMenus(prev => [...prev, newMenu])
      return newMenu
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateMenu = async (id, menuData) => {
    try {
      const updatedMenu = await apiService.menus.update(id, menuData)
      setMenus(prev => 
        prev.map(menu => 
          menu.id === id ? updatedMenu : menu
        )
      )
      return updatedMenu
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteMenu = async (id) => {
    try {
      await apiService.menus.delete(id)
      setMenus(prev => prev.filter(menu => menu.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const refresh = () => {
    fetchMenus()
  }

  return {
    menus,
    loading,
    error,
    createMenu,
    updateMenu,
    deleteMenu,
    refresh,
  }
}

export function useMenu(id) {
  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchMenu = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await apiService.menus.get(id)
        setMenu(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching menu:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [id])

  return {
    menu,
    loading,
    error,
  }
}

export function useRestaurantMenus(restaurantId) {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!restaurantId) return

    const fetchMenus = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await apiService.menus.getByRestaurant(restaurantId)
        setMenus(data.items || data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching restaurant menus:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenus()
  }, [restaurantId])

  return {
    menus,
    loading,
    error,
  }
}

