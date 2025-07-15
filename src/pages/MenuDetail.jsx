import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  ArrowLeft,
  Search,
  Plus,
  ChefHat,
  Clock,
  DollarSign,
  Star,
  Edit,
  Trash2,
  Eye,
  Filter,
  Grid,
  List,
  Image as ImageIcon
} from 'lucide-react'

// Моковые данные
const mockMenu = {
  id: 1,
  name: 'Основное меню',
  description: 'Основные блюда ресторана с изысканными вкусами',
  restaurant: {
    id: 1,
    name: 'Ресторан "Белуга"'
  },
  categoriesCount: 8,
  dishesCount: 45,
  status: 'active'
}

const mockCategories = [
  { id: 1, name: 'Закуски', dishesCount: 8 },
  { id: 2, name: 'Супы', dishesCount: 6 },
  { id: 3, name: 'Горячие блюда', dishesCount: 15 },
  { id: 4, name: 'Салаты', dishesCount: 7 },
  { id: 5, name: 'Десерты', dishesCount: 5 },
  { id: 6, name: 'Напитки', dishesCount: 4 }
]

const mockDishes = [
  {
    id: 1,
    name: 'Стейк Рибай',
    description: 'Сочный стейк из мраморной говядины с гарниром из овощей гриль',
    price: 2500,
    category: 'Горячие блюда',
    cookingTime: 25,
    rating: 4.8,
    status: 'active',
    ingredients: ['Говядина', 'Овощи', 'Специи'],
    tags: ['Мясо', 'Гриль'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'Паста Карбонара',
    description: 'Классическая итальянская паста с беконом, яйцом и сыром пармезан',
    price: 890,
    category: 'Горячие блюда',
    cookingTime: 15,
    rating: 4.6,
    status: 'active',
    ingredients: ['Паста', 'Бекон', 'Яйца', 'Пармезан'],
    tags: ['Паста', 'Итальянская кухня'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop'
  },
  {
    id: 3,
    name: 'Цезарь с креветками',
    description: 'Свежий салат с креветками, листьями салата и соусом цезарь',
    price: 650,
    category: 'Салаты',
    cookingTime: 10,
    rating: 4.4,
    status: 'active',
    ingredients: ['Креветки', 'Салат', 'Соус цезарь', 'Сухарики'],
    tags: ['Морепродукты', 'Легкое'],
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=300&h=200&fit=crop'
  },
  {
    id: 4,
    name: 'Тирамису',
    description: 'Классический итальянский десерт с кофе и маскарпоне',
    price: 450,
    category: 'Десерты',
    cookingTime: 5,
    rating: 4.9,
    status: 'draft',
    ingredients: ['Маскарпоне', 'Кофе', 'Печенье савоярди'],
    tags: ['Десерт', 'Кофе'],
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop'
  }
]

export function MenuDetail() {
  const { restaurantId, menuId } = useParams()
  const [menu, setMenu] = useState(null)
  const [dishes, setDishes] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setMenu(mockMenu)
      setDishes(mockDishes)
      setCategories(mockCategories)
      setLoading(false)
    }, 1000)
  }, [restaurantId, menuId])

  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dish.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || dish.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Skeleton className="h-16 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/restaurants/${restaurantId}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к ресторану
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{menu.name}</h1>
            <p className="text-muted-foreground">{menu.restaurant.name}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Редактировать меню
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Добавить блюдо
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Фильтры и поиск</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Поиск блюд..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Все категории" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name} ({category.dishesCount})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Все статусы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="active">Активные</SelectItem>
                    <SelectItem value="draft">Черновики</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dishes */}
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
            : "space-y-4"
          }>
            {filteredDishes.map((dish) => (
              <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {viewMode === 'grid' ? (
                  <>
                    <div className="relative">
                      <div className="w-full h-48 bg-muted overflow-hidden">
                        {dish.image ? (
                          <img 
                            src={dish.image} 
                            alt={dish.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant={dish.status === 'active' ? 'default' : 'secondary'}>
                          {dish.status === 'active' ? 'Активно' : 'Черновик'}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="outline" className="bg-background/80">
                          {dish.price} ₽
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{dish.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {dish.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{dish.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{dish.cookingTime} мин</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {dish.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {dish.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{dish.tags.length - 2}
                            </Badge>
                          )}
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
                  </>
                ) : (
                  <div className="flex p-4">
                    <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      {dish.image ? (
                        <img 
                          src={dish.image} 
                          alt={dish.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 ml-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{dish.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {dish.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1 text-sm">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>{dish.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{dish.cookingTime} мин</span>
                            </div>
                            <Badge variant="outline">{dish.category}</Badge>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2">
                          <div className="text-lg font-bold">{dish.price} ₽</div>
                          <Badge variant={dish.status === 'active' ? 'default' : 'secondary'}>
                            {dish.status === 'active' ? 'Активно' : 'Черновик'}
                          </Badge>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {filteredDishes.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <ChefHat className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Блюда не найдены</h3>
                <p className="text-muted-foreground mb-4">
                  Попробуйте изменить фильтры или добавить новое блюдо
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить блюдо
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Menu Info */}
          <Card>
            <CardHeader>
              <CardTitle>Информация о меню</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Описание</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {menu.description}
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Категорий</span>
                  <span className="font-medium">{menu.categoriesCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Всего блюд</span>
                  <span className="font-medium">{menu.dishesCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Активных блюд</span>
                  <span className="font-medium">
                    {dishes.filter(d => d.status === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Статус</span>
                  <Badge variant="default">Активно</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Категории</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div 
                    key={category.id} 
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    <Badge variant="outline">{category.dishesCount}</Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Добавить категорию
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

