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
  Menu, 
  Search, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Store,
  ChefHat,
  Clock,
  Utensils
} from 'lucide-react'

const mockMenus = [
  {
    id: 1,
    name: 'Основное меню',
    restaurant: 'Ресторан "Белуга"',
    restaurantId: 1,
    type: 'Основное',
    categoriesCount: 8,
    dishesCount: 45,
    status: 'Активно',
    lastUpdated: '2024-01-15',
    description: 'Основное меню ресторана с авторскими блюдами'
  },
  {
    id: 2,
    name: 'Винная карта',
    restaurant: 'Ресторан "Белуга"',
    restaurantId: 1,
    type: 'Напитки',
    categoriesCount: 4,
    dishesCount: 120,
    status: 'Активно',
    lastUpdated: '2024-01-10',
    description: 'Коллекция избранных вин'
  },
  {
    id: 3,
    name: 'Завтраки',
    restaurant: 'Кафе "Шоколадница"',
    restaurantId: 2,
    type: 'Завтраки',
    categoriesCount: 3,
    dishesCount: 18,
    status: 'Активно',
    lastUpdated: '2024-01-12',
    description: 'Меню завтраков с 8:00 до 12:00'
  },
  {
    id: 4,
    name: 'Коктейльная карта',
    restaurant: 'Бар "Мята"',
    restaurantId: 3,
    type: 'Напитки',
    categoriesCount: 5,
    dishesCount: 35,
    status: 'На модерации',
    lastUpdated: '2024-01-14',
    description: 'Авторские коктейли и классика'
  }
]

const mockCategories = [
  { id: 1, name: 'Закуски', dishesCount: 8, menuId: 1 },
  { id: 2, name: 'Супы', dishesCount: 6, menuId: 1 },
  { id: 3, name: 'Горячие блюда', dishesCount: 15, menuId: 1 },
  { id: 4, name: 'Десерты', dishesCount: 10, menuId: 1 },
  { id: 5, name: 'Красные вина', dishesCount: 45, menuId: 2 },
  { id: 6, name: 'Белые вина', dishesCount: 35, menuId: 2 }
]

const restaurants = ['Все рестораны', 'Ресторан "Белуга"', 'Кафе "Шоколадница"', 'Бар "Мята"']
const menuTypes = ['Все типы', 'Основное', 'Завтраки', 'Обеды', 'Ужины', 'Напитки', 'Десерты']

export function Menus() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRestaurant, setSelectedRestaurant] = useState('Все рестораны')
  const [selectedType, setSelectedType] = useState('Все типы')
  const [selectedMenu, setSelectedMenu] = useState(null)

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

  const getTypeColor = (type) => {
    switch (type) {
      case 'Основное':
        return 'bg-blue-100 text-blue-800'
      case 'Завтраки':
        return 'bg-orange-100 text-orange-800'
      case 'Напитки':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredCategories = selectedMenu 
    ? mockCategories.filter(cat => cat.menuId === selectedMenu.id)
    : []

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Меню</h1>
          <p className="text-muted-foreground">Управление меню ресторанов</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Добавить категорию
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Создать меню
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Фильтры</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию меню..."
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

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Тип меню" />
              </SelectTrigger>
              <SelectContent>
                {menuTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Menus List */}
        <Card>
          <CardHeader>
            <CardTitle>Список меню</CardTitle>
            <CardDescription>Выберите меню для просмотра категорий</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMenus.map((menu) => (
                <div 
                  key={menu.id} 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedMenu?.id === menu.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedMenu(menu)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium">{menu.name}</h3>
                        <Badge className={getStatusColor(menu.status)}>
                          {menu.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-1">
                        <Store className="w-3 h-3" />
                        <span>{menu.restaurant}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <Utensils className="w-3 h-3" />
                          <span>{menu.categoriesCount} категорий</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ChefHat className="w-3 h-3" />
                          <span>{menu.dishesCount} блюд</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{menu.description}</p>
                      
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-2">
                        <Clock className="w-3 h-3" />
                        <span>Обновлено: {menu.lastUpdated}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-1">
                      <Badge className={getTypeColor(menu.type)} variant="outline">
                        {menu.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      Просмотр
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3 mr-1" />
                      Редактировать
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedMenu ? `Категории: ${selectedMenu.name}` : 'Категории меню'}
            </CardTitle>
            <CardDescription>
              {selectedMenu 
                ? `Категории блюд в меню "${selectedMenu.name}"`
                : 'Выберите меню для просмотра категорий'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedMenu ? (
              <div className="space-y-3">
                {filteredCategories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {category.dishesCount} блюд
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить категорию
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Menu className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Выберите меню из списка слева для просмотра категорий</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

