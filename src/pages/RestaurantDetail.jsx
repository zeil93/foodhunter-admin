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
  MoreHorizontal
} from 'lucide-react'

// Моковые данные для демонстрации
const mockRestaurant = {
  id: 1,
  name: 'Ресторан "Белуга"',
  description: 'Изысканная европейская кухня в самом сердце города. Мы предлагаем уникальные блюда, приготовленные из свежайших ингредиентов.',
  address: 'ул. Тверская, 15',
  city: { name: 'Москва' },
  type: { name: 'Ресторан' },
  priceSegment: { name: 'Высокий' },
  rating: 4.8,
  phone: '+7 (495) 123-45-67',
  website: 'https://beluga-restaurant.ru',
  workingHours: '10:00 - 23:00',
  status: 'active',
  images: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=400&fit=crop'
  ]
}

const mockMenus = [
  {
    id: 1,
    name: 'Основное меню',
    description: 'Основные блюда ресторана',
    categoriesCount: 8,
    dishesCount: 45,
    status: 'active',
    isActive: true
  },
  {
    id: 2,
    name: 'Винная карта',
    description: 'Изысканные вина и напитки',
    categoriesCount: 4,
    dishesCount: 120,
    status: 'active',
    isActive: true
  },
  {
    id: 3,
    name: 'Детское меню',
    description: 'Специальные блюда для детей',
    categoriesCount: 3,
    dishesCount: 15,
    status: 'draft',
    isActive: false
  }
]

export function RestaurantDetail() {
  const { restaurantId } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setRestaurant(mockRestaurant)
      setMenus(mockMenus)
      setLoading(false)
    }, 1000)
  }, [restaurantId])

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
          <div className="space-y-6">
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
          <Link to="/restaurants">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к ресторанам
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{restaurant.name}</h1>
            <p className="text-muted-foreground">{restaurant.city.name} • {restaurant.type.name}</p>
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
                {restaurant.images.map((image, index) => (
                  <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${restaurant.name} - фото ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
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
                {menus.map((menu) => (
                  <div key={menu.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Menu className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{menu.name}</h3>
                            <p className="text-sm text-muted-foreground">{menu.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-3">
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Menu className="w-4 h-4" />
                            <span>{menu.categoriesCount} категорий</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <ChefHat className="w-4 h-4" />
                            <span>{menu.dishesCount} блюд</span>
                          </div>
                          <Badge variant={menu.status === 'active' ? 'default' : 'secondary'}>
                            {menu.status === 'active' ? 'Активно' : 'Черновик'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link to={`/restaurants/${restaurantId}/menus/${menu.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Открыть
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
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
                <span className="font-medium">{restaurant.rating}</span>
                <span className="text-sm text-muted-foreground">рейтинг</span>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Адрес</p>
                    <p className="text-sm text-muted-foreground">{restaurant.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Время работы</p>
                    <p className="text-sm text-muted-foreground">{restaurant.workingHours}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Телефон</p>
                    <p className="text-sm text-muted-foreground">{restaurant.phone}</p>
                  </div>
                </div>
                
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
                <span className="font-medium">{menus.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Активных меню</span>
                <span className="font-medium">{menus.filter(m => m.status === 'active').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Всего блюд</span>
                <span className="font-medium">{menus.reduce((sum, m) => sum + m.dishesCount, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ценовой сегмент</span>
                <Badge variant="outline">{restaurant.priceSegment.name}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

