import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  DollarSign,
  Star,
  Edit,
  Plus,
  Image as ImageIcon,
  Loader2,
  Building,
  Tag,
  Calendar,
  Menu
} from 'lucide-react'
import apiService from '../services/api'

export function RestaurantView() {
  const { restaurantId } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Загружаем данные ресторана
        const restaurantData = await apiService.restaurants.get(restaurantId)
        setRestaurant(restaurantData)
        
        // Загружаем меню ресторана
        const menusData = await apiService.menus.list({ restaurant_id: restaurantId })
        setMenus(menusData.items || menusData || [])
        
      } catch (err) {
        setError(err.message)
        console.error('Error fetching restaurant data:', err)
      } finally {
        setLoading(false)
      }
    }

    if (restaurantId) {
      fetchRestaurantData()
    }
  }, [restaurantId])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'Активен':
        return 'bg-green-100 text-green-800'
      case 'pending':
      case 'На модерации':
        return 'bg-yellow-100 text-yellow-800'
      case 'inactive':
      case 'Неактивен':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatWorkingHours = (workingHours) => {
    if (!workingHours || workingHours.length === 0) return 'Не указано'
    
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    
    return workingHours.map(schedule => {
      const dayNames = schedule.days_of_week.map(day => days[day]).join(', ')
      return `${dayNames}: ${schedule.begin} - ${schedule.end}`
    }).join('; ')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Загрузка ресторана...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Ошибка загрузки данных</p>
          <p className="text-gray-500">{error}</p>
          <Button asChild className="mt-4">
            <Link to="/restaurants">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к списку
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Ресторан не найден</p>
          <Button asChild>
            <Link to="/restaurants">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к списку
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/restaurants">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            <p className="text-muted-foreground">
              {restaurant.city?.name} • {restaurant.type?.name}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge className={getStatusColor(restaurant.status)}>
            {restaurant.status || 'Активен'}
          </Badge>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Редактировать
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList>
          <TabsTrigger value="info">Информация</TabsTrigger>
          <TabsTrigger value="menus">Меню ({menus.length})</TabsTrigger>
          <TabsTrigger value="images">Изображения</TabsTrigger>
        </TabsList>

        {/* Restaurant Info Tab */}
        <TabsContent value="info" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Основная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Название</label>
                  <p className="text-lg">{restaurant.name}</p>
                </div>
                
                {restaurant.description && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Описание</label>
                    <p>{restaurant.description}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Юридическое название</label>
                  <p>{restaurant.legal_name || 'Не указано'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Тип заведения</label>
                  <p>{restaurant.type?.name || 'Не указан'}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-medium text-gray-500">Ценовой сегмент:</span>
                  <span>{restaurant.price_segment?.name || 'Не указан'}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Контактная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Адрес</label>
                    <p>{restaurant.address || 'Не указан'}</p>
                    <p className="text-sm text-gray-500">{restaurant.city?.name}</p>
                  </div>
                </div>
                
                {restaurant.phone_numbers && restaurant.phone_numbers.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 mt-1" />
                    <div>
                      <label className="text-sm font-medium text-gray-500">Телефоны</label>
                      {restaurant.phone_numbers.map((phone, index) => (
                        <p key={index}>{phone}</p>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-1" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Время работы</label>
                    <p className="text-sm">{formatWorkingHours(restaurant.working_hours)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cooking Tags */}
          {restaurant.cooking_tags && restaurant.cooking_tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Кулинарные теги
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {restaurant.cooking_tags.map((tag) => (
                    <Badge key={tag.id} variant="outline" className="flex items-center gap-1">
                      {tag.image_url && (
                        <img src={tag.image_url} alt={tag.name} className="w-4 h-4 rounded" />
                      )}
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Menus Tab */}
        <TabsContent value="menus" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Меню ресторана</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Добавить меню
            </Button>
          </div>
          
          {menus.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menus.map((menu) => (
                <Card key={menu.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Menu className="w-5 h-5" />
                      {menu.name}
                    </CardTitle>
                    <CardDescription>
                      {menu.type?.name || 'Основное меню'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/restaurants/${restaurantId}/menus/${menu.id}`}>
                          Просмотр
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3 mr-1" />
                        Редактировать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Menu className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Нет меню
              </h3>
              <p className="text-gray-500 mb-4">
                Добавьте первое меню для этого ресторана
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить меню
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Изображения ресторана</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Добавить изображение
            </Button>
          </div>
          
          {restaurant.images && restaurant.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {restaurant.images.map((image) => (
                <Card key={image.id}>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      <img 
                        src={image.url} 
                        alt={image.text}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center" style={{display: 'none'}}>
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{image.text}</p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3 mr-1" />
                        Редактировать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Нет изображений
              </h3>
              <p className="text-gray-500 mb-4">
                Добавьте изображения ресторана
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить изображение
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default RestaurantView

