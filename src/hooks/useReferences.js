import { useState, useEffect } from 'react'
import apiService from '../services/api'

export function useCities() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await apiService.references.cities.list()
        setCities(data.data || data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching cities:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCities()
  }, [])

  return { cities, loading, error }
}

export function useRestaurantTypes() {
  const [restaurantTypes, setRestaurantTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRestaurantTypes = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await apiService.references.restaurantTypes.list()
        setRestaurantTypes(data.data || data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching restaurant types:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurantTypes()
  }, [])

  return { restaurantTypes, loading, error }
}

export function usePriceSegments() {
  const [priceSegments, setPriceSegments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPriceSegments = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await apiService.references.priceSegments.list()
        setPriceSegments(data.data || data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching price segments:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPriceSegments()
  }, [])

  return { priceSegments, loading, error }
}

export function useCookingTags() {
  const [cookingTags, setCookingTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCookingTags = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await apiService.references.cookingTags.list()
        setCookingTags(data.data || data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching cooking tags:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCookingTags()
  }, [])

  return { cookingTags, loading, error }
}

export function useIngredients() {
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await apiService.references.ingredients.list()
        setIngredients(data.data || data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching ingredients:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchIngredients()
  }, [])

  return { ingredients, loading, error }
}

// Комбинированный хук для получения всех справочников
export function useAllReferences() {
  const { cities, loading: citiesLoading, error: citiesError } = useCities()
  const { restaurantTypes, loading: typesLoading, error: typesError } = useRestaurantTypes()
  const { priceSegments, loading: segmentsLoading, error: segmentsError } = usePriceSegments()
  const { cookingTags, loading: tagsLoading, error: tagsError } = useCookingTags()
  const { ingredients, loading: ingredientsLoading, error: ingredientsError } = useIngredients()

  const loading = citiesLoading || typesLoading || segmentsLoading || tagsLoading || ingredientsLoading
  const error = citiesError || typesError || segmentsError || tagsError || ingredientsError

  return {
    references: {
      cities,
      restaurantTypes,
      priceSegments,
      cookingTags,
      ingredients,
    },
    loading,
    error,
  }
}


// Алиас для обратной совместимости
export const useReferences = useAllReferences

