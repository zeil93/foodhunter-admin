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
  ChefHat, 
  Search, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Store,
  DollarSign,
  Star,
  Image as ImageIcon,
  Tag,
  Clock
} from 'lucide-react'

const mockDishes = [
  {
    id: 1,
    name: 'Стейк Рибай',
    description: 'Сочный стейк из мраморной говядины с гарниром из овощей гриль',
    price: 2500,
    restaurant: 'Ресторан "Белуга"',
    category: 'Горячие блюда',
    menu: 'Основное меню',
    cookingTime: 25,
    rating: 4.8,
    status: 'Активно',
    image: '/api/placeholder/300/200',
    ingredients: ['Говядина', 'Овощи', 'Специи'],
    tags: ['Мясо', 'Гриль', 'Премиум']
  },
  {
    id: 2,
    name: 'Паста Карбонара',
    description: 'Классическая итальянская паста с беконом, яйцом и сыром пармезан',
    price: 890,
    restaurant: 'Ресторан "Белуга"',
    category: 'Горячие блюда',
    menu: 'Основное меню',
    cookingTime: 15,
    rating: 4.6,
    status: 'Активно',
    image: '/api/placeholder/300/200',
    ingredients: ['Паста', 'Бекон', 'Яйца', 'Пармезан'],
    tags: ['Паста', 'Итальянская кухня']
  },
  {
    id: 3,
    name: 'Капучино',
    description: 'Ароматный кофе с молочной пенкой',
    price: 250,
    restaurant: 'Кафе "Шоколадница"',
    category: 'Напитки',
    menu: 'Завтраки',
    cookingTime: 5,
    rating: 4.3,
    status: 'Активно',
    image: '/api/placeholder/300/200',
    ingredients: ['Кофе', 'Молоко'],
    tags: ['Кофе', 'Горячие напитки']
  },
  {
    id: 4,
    name: 'Мохито',
    description: 'Освежающий коктейль с мятой, лаймом и ромом',
    price: 450,
    restaurant: 'Бар "Мята"',
    category: 'Коктейли',
    menu: 'Коктейльная карта',
    cookingTime: 3,
    rating: 4.7,
    status: 'На модерации',
    image: '/api/placeholder/300/200',
    ingredients: ['Ром', 'Мята', 'Лайм', 'Содовая'],
    tags: ['Коктейль', 'Освежающий', 'Алкогольный']
  }
]

const restaurants = ['Все рестораны', 'Ресторан "Белуга"', 'Кафе "Шоколадница"', 'Бар "Мята"']
const categories = ['Все категории', 'Горячие блюда', 'Закуски', 'Супы', 'Десерты', 'Напитки', 'Коктейли']
const statuses = ['Все статусы', 'Активно', 'На модерации', 'Неактивно']

export function Dishes() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRestaurant, setSelectedRestaurant] = useState('Все рестораны')
  const [selectedCategory, setSelectedCategory] = useState('Все категории')
  const [selectedStatus, setSelectedStatus] = useState('Все статусы')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Активно':
        return 'bg-green-100 text-green-800'
      case 'На модерации':
        return 'bg-yellow-100 text-yellow-800'
      case 'Неактивно':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Блюда</h1>
          <p className="text-muted-foreground">Управление блюдами и позициями меню</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Добавить блюдо
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Фильтры</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск блюд..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedRestaurant} onValueChange={setSelectedRestaurant}>
              <SelectTrigger>
                <SelectValue placeholder="Ресторан" />
              </SelectTrigger>
              <SelectContent>
                {restaurants.map((restaurant) => (
                  <SelectItem key={restaurant} value={restaurant}>{restaurant}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Цена от"
              type="number"
              value={priceRange.min}
              onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
            />

            <Input
              placeholder="Цена до"
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDishes.map((dish) => (
          <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="w-full h-48 bg-muted flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
              </div>
              <div className="absolute top-2 right-2">
                <Badge className={getStatusColor(dish.status)}>
                  {dish.status}
                </Badge>
              </div>
              <div className="absolute bottom-2 left-2">
                <Badge className="bg-black/70 text-white">
                  {formatPrice(dish.price)}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{dish.name}</CardTitle>
                  <CardDescription className="mt-1 line-clamp-2">
                    {dish.description}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{dish.rating}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ресторан:</span>
                  <span className="text-right">{dish.restaurant}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Категория:</span>
                  <Badge variant="outline">{dish.category}</Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Меню:</span>
                  <span className="text-right">{dish.menu}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Время готовки:</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{dish.cookingTime} мин</span>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <span className="text-sm text-muted-foreground">Ингредиенты:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {dish.ingredients.slice(0, 3).map((ingredient, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                    {dish.ingredients.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{dish.ingredients.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <span className="text-sm text-muted-foreground">Теги:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {dish.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="w-2 h-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {dish.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{dish.tags.length - 2}
                      </Badge>
                    )}
                  </div>
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
          Показано 4 из 2,847 блюд
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

