import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Store, 
  Search, 
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  MapPin,
  DollarSign,
  Star,
  Image as ImageIcon,
  Loader2
} from 'lucide-react'
import { useRestaurants } from '../hooks/useRestaurants'
import { useReferences } from '../hooks/useReferences'

export function Restaurants() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedPriceSegment, setSelectedPriceSegment] = useState('')
  const [viewMode, setViewMode] = useState('cards') // 'cards' or 'table'

  // Получаем данные из API
  const { restaurants, pagination, loading, error } = useRestaurants({
    search: searchQuery,
    city_id: selectedCity,
    restaurant_type_id: selectedType,
    price_segment_id: selectedPriceSegment
  })

  // Получаем справочники
  const { cities, restaurantTypes, priceSegments, loading: referencesLoading } = useReferences()

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

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Активен'
      case 'pending':
        return 'На модерации'
      case 'inactive':
        return 'Неактивен'
      default:
        return status
    }
  }

  if (loading || referencesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Загрузка ресторанов...</span>
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

  const getPriceSegmentColor = (segment) => {
    switch (segment) {
      case 'Низкий':
        return 'bg-blue-100 text-blue-800'
      case 'Средний':
        return 'bg-green-100 text-green-800'
      case 'Высокий':
        return 'bg-orange-100 text-orange-800'
      case 'Luxury':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Рестораны</h1>
          <p className="text-muted-foreground">Управление ресторанами и заведениями</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Добавить ресторан
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Фильтры</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Все города" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все города</SelectItem>
                {cities?.map((city) => (
                  <SelectItem key={city.id} value={city.id.toString()}>{city.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Все типы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все типы</SelectItem>
                {restaurantTypes?.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPriceSegment} onValueChange={setSelectedPriceSegment}>
              <SelectTrigger>
                <SelectValue placeholder="Все сегменты" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все сегменты</SelectItem>
                {priceSegments?.map((segment) => (
                  <SelectItem key={segment.id} value={segment.id.toString()}>{segment.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex space-x-2">
              <Button 
                variant={viewMode === 'cards' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                Карточки
              </Button>
              <Button 
                variant={viewMode === 'table' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('table')}
              >
                Таблица
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants?.map((restaurant) => (
          <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="w-full h-48 bg-muted flex items-center justify-center">
                {restaurant.image_url ? (
                  <img 
                    src={restaurant.image_url} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                )}
              </div>
              <div className="absolute top-2 right-2">
                <Badge className={getStatusColor(restaurant.status)}>
                  {getStatusText(restaurant.status)}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {restaurant.address}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{restaurant.rating || 'N/A'}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Город:</span>
                  <span>{restaurant.city?.name || 'Не указан'}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Тип:</span>
                  <Badge variant="outline">{restaurant.restaurant_type?.name || 'Не указан'}</Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ценовой сегмент:</span>
                  <Badge variant="outline">
                    {restaurant.price_segment?.name || 'Не указан'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Меню:</span>
                  <span>{restaurant.menus_count || 0}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Блюда:</span>
                  <span>{restaurant.dishes_count || 0}</span>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Link to={`/restaurants/${restaurant.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-1" />
                      Просмотр
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Редактировать
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Показано {restaurants?.length || 0} из {pagination?.total || 0} ресторанов
        </p>
        {pagination && pagination.total > restaurants?.length && (
          <p className="text-sm text-muted-foreground">
            Загружены все доступные рестораны
          </p>
        )}
      </div>
    </div>
  )
}