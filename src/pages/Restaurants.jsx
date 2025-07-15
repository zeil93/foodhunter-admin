import { useState } from 'react'
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
  Image as ImageIcon
} from 'lucide-react'

const mockRestaurants = [
  {
    id: 1,
    name: 'Ресторан "Белуга"',
    address: 'ул. Тверская, 15',
    city: 'Москва',
    type: 'Ресторан',
    priceSegment: 'Высокий',
    rating: 4.8,
    status: 'Активен',
    menusCount: 3,
    dishesCount: 45,
    image: '/api/placeholder/300/200'
  },
  {
    id: 2,
    name: 'Кафе "Шоколадница"',
    address: 'Невский пр., 28',
    city: 'Санкт-Петербург',
    type: 'Кафе',
    priceSegment: 'Средний',
    rating: 4.2,
    status: 'Активен',
    menusCount: 2,
    dishesCount: 32,
    image: '/api/placeholder/300/200'
  },
  {
    id: 3,
    name: 'Бар "Мята"',
    address: 'ул. Ленина, 42',
    city: 'Екатеринбург',
    type: 'Бар',
    priceSegment: 'Средний',
    rating: 4.5,
    status: 'На модерации',
    menusCount: 1,
    dishesCount: 18,
    image: '/api/placeholder/300/200'
  },
  {
    id: 4,
    name: 'Фастфуд "Бургер Кинг"',
    address: 'ТЦ Мега, 1 этаж',
    city: 'Новосибирск',
    type: 'Фастфуд',
    priceSegment: 'Низкий',
    rating: 3.9,
    status: 'Активен',
    menusCount: 1,
    dishesCount: 28,
    image: '/api/placeholder/300/200'
  }
]

const cities = ['Все города', 'Москва', 'Санкт-Петербург', 'Екатеринбург', 'Новосибирск']
const types = ['Все типы', 'Ресторан', 'Кафе', 'Бар', 'Фастфуд']
const priceSegments = ['Все сегменты', 'Низкий', 'Средний', 'Высокий', 'Luxury']

export function Restaurants() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('Все города')
  const [selectedType, setSelectedType] = useState('Все типы')
  const [selectedPriceSegment, setSelectedPriceSegment] = useState('Все сегменты')
  const [viewMode, setViewMode] = useState('cards') // 'cards' or 'table'

  const getStatusColor = (status) => {
    switch (status) {
      case 'Активен':
        return 'bg-green-100 text-green-800'
      case 'На модерации':
        return 'bg-yellow-100 text-yellow-800'
      case 'Неактивен':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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
                <SelectValue placeholder="Город" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Тип" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPriceSegment} onValueChange={setSelectedPriceSegment}>
              <SelectTrigger>
                <SelectValue placeholder="Ценовой сегмент" />
              </SelectTrigger>
              <SelectContent>
                {priceSegments.map((segment) => (
                  <SelectItem key={segment} value={segment}>{segment}</SelectItem>
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
        {mockRestaurants.map((restaurant) => (
          <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="w-full h-48 bg-muted flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
              </div>
              <div className="absolute top-2 right-2">
                <Badge className={getStatusColor(restaurant.status)}>
                  {restaurant.status}
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
                  <span className="text-sm font-medium">{restaurant.rating}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Город:</span>
                  <span>{restaurant.city}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Тип:</span>
                  <Badge variant="outline">{restaurant.type}</Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ценовой сегмент:</span>
                  <Badge className={getPriceSegmentColor(restaurant.priceSegment)}>
                    {restaurant.priceSegment}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Меню:</span>
                  <span>{restaurant.menusCount}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Блюда:</span>
                  <span>{restaurant.dishesCount}</span>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Просмотр
                  </Button>
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
          Показано 4 из 156 ресторанов
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Предыдущая
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Следующая
          </Button>
        </div>
      </div>
    </div>
  )
}

