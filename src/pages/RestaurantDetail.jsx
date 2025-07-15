import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Phone,
  Globe,
  Edit,
  Plus,
  Menu,
  ChefHat,
  Eye,
  MoreHorizontal,
  Loader2
} from 'lucide-react'
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'draft':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Активно'
      case 'draft':
        return 'Черновик'
      case 'pending':
        return 'На модерации'
      case 'inactive':
        return 'Неактивно'
      default:
        return status
    }
  }

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
        <div className="flex space-x-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Редактировать
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Добавить меню
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Restaurant Images */}
          <Card>
            <CardHeader>
              <CardTitle>Фотографии</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {restaurant.images && restaurant.images.length > 0 ? (
                  restaurant.images.map((image, index) => (
                    <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={image.url || image} 
                        alt={`${restaurant.name} - фото ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Изображения не загружены</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Menus */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Меню ресторана</CardTitle>
                  <CardDescription>
                    Управление меню и категориями блюд
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Создать меню
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {menus && menus.length > 0 ? (
                  menus.map((menu) => (
                    <div key={menu.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Menu className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{menu.name}</h3>
                              <p className="text-sm text-muted-foreground">{menu.description || 'Описание не указано'}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mt-3">
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Menu className="w-4 h-4" />
                              <span>{menu.categories_count || 0} категорий</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <ChefHat className="w-4 h-4" />
                              <span>{menu.dishes_count || 0} блюд</span>
                            </div>
                            <Badge className={getStatusColor(menu.status)}>
                              {getStatusText(menu.status)}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link to={`/restaurants/${restaurantId}/menus/${menu.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Просмотр
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Редактировать
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Menu className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Меню не найдены</p>
                    <p className="text-sm text-muted-foreground">Создайте первое меню для этого ресторана</p>
                  </div>
                )}
              </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Restaurant Info */}
          <Card>
            <CardHeader>
              <CardTitle>Информация о ресторане</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{restaurant.rating || 'N/A'}</span>
                <span className="text-sm text-muted-foreground">рейтинг</span>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Адрес</p>
                    <p className="text-sm text-muted-foreground">{restaurant.address || 'Не указан'}</p>
                  </div>
                </div>
                
                {restaurant.working_hours && (
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Время работы</p>
                      <p className="text-sm text-muted-foreground">{restaurant.working_hours}</p>
                    </div>
                  </div>
                )}
                
                {restaurant.phone && (
                  <div className="flex items-start space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Телефон</p>
                      <p className="text-sm text-muted-foreground">{restaurant.phone}</p>
                    </div>
                  </div>
                )}
                
                {restaurant.website && (
                  <div className="flex items-start space-x-2">
                    <Globe className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Сайт</p>
                      <a 
                        href={restaurant.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {restaurant.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Статистика</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Всего меню</span>
                <span className="font-medium">{menus?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Активных меню</span>
                <span className="font-medium">{menus?.filter(m => m.status === 'active').length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Всего блюд</span>
                <span className="font-medium">{menus?.reduce((sum, m) => sum + (m.dishes_count || 0), 0) || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ценовой сегмент</span>
                <Badge variant="outline">{restaurant.price_segment?.name || 'Не указан'}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

