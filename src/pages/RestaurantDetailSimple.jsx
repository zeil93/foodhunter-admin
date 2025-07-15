import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRestaurant } from '../hooks/useRestaurants'
import { useMenus } from '../hooks/useMenus'

export function RestaurantDetail() {
  const { restaurantId } = useParams()
  
  // Получаем данные ресторана из API
  const { restaurant, loading: restaurantLoading, error: restaurantError } = useRestaurant(restaurantId)
  
  // Получаем меню ресторана из API
  const { menus, loading: menusLoading, error: menusError } = useMenus({ restaurant_id: restaurantId })

  const loading = restaurantLoading || menusLoading
  const error = restaurantError || menusError

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Загрузка данных ресторана...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Ошибка загрузки данных</p>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600">Ресторан не найден</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/restaurants">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к ресторанам
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{restaurant.name}</h1>
            <p className="text-muted-foreground">
              {restaurant.city?.name || 'Город не указан'} • {restaurant.restaurant_type?.name || 'Тип не указан'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Restaurant Info */}
        <Card>
          <CardHeader>
            <CardTitle>Информация о ресторане</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Название:</strong> {restaurant.name}</p>
              <p><strong>Адрес:</strong> {restaurant.address || 'Не указан'}</p>
              <p><strong>Телефон:</strong> {restaurant.phone || 'Не указан'}</p>
              <p><strong>Рейтинг:</strong> {restaurant.rating || 'N/A'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Menus */}
        <Card>
          <CardHeader>
            <CardTitle>Меню ресторана</CardTitle>
            <CardDescription>Всего меню: {menus?.length || 0}</CardDescription>
          </CardHeader>
          <CardContent>
            {menus && menus.length > 0 ? (
              <div className="space-y-2">
                {menus.map((menu) => (
                  <div key={menu.id} className="p-3 border rounded">
                    <h4 className="font-medium">{menu.name}</h4>
                    <p className="text-sm text-gray-600">{menu.description || 'Описание не указано'}</p>
                    <div className="mt-2">
                      <Link to={`/restaurants/${restaurantId}/menus/${menu.id}`}>
                        <Button size="sm" variant="outline">
                          Просмотр меню
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Меню не найдены</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

