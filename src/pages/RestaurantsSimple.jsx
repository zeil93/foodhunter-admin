import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Store, 
  Search, 
  Plus,
  Eye,
  Edit,
  Trash2,
  MapPin,
  DollarSign,
  Star,
  Loader2
} from 'lucide-react'
import { useRestaurants } from '../hooks/useRestaurants'

export function RestaurantsSimple() {
  const [searchQuery, setSearchQuery] = useState('')

  // Получаем данные из API
  const { restaurants, loading, error } = useRestaurants({
    search: searchQuery
  })

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
        return status || 'Активен'
    }
  }

  if (loading) {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Рестораны</h1>
          <p className="text-muted-foreground">
            Управление ресторанами и заведениями
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Добавить ресторан
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Поиск ресторанов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {restaurant.city?.name || 'Не указан'} • {restaurant.restaurant_type?.name || 'Ресторан'}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(restaurant.status)}>
                    {getStatusText(restaurant.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {restaurant.address && (
                    <p className="text-sm text-muted-foreground">
                      📍 {restaurant.address}
                    </p>
                  )}
                  
                  {restaurant.phone && (
                    <p className="text-sm text-muted-foreground">
                      📞 {restaurant.phone}
                    </p>
                  )}

                  {restaurant.price_segment && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      <span className="text-sm">{restaurant.price_segment.name}</span>
                    </div>
                  )}

                  {restaurant.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{restaurant.rating}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/restaurants/${restaurant.id}`}>
                      <Eye className="w-3 h-3 mr-1" />
                      Просмотр
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3 mr-1" />
                    Редактировать
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Store className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Нет ресторанов
            </h3>
            <p className="text-gray-500 mb-4">
              Начните с добавления первого ресторана
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Добавить ресторан
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default RestaurantsSimple

