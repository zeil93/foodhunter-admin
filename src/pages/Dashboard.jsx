import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  Store, 
  ChefHat, 
  Users, 
  TrendingUp,
  Plus,
  Eye,
  Edit,
  AlertCircle
} from 'lucide-react'
import { useDashboard } from '../hooks/useDashboard'
import { useRestaurants } from '../hooks/useRestaurants'

const stats = [
  {
    title: 'Рестораны',
    key: 'restaurants',
    icon: Store,
    color: 'text-blue-600'
  },
  {
    title: 'Блюда',
    key: 'dishes',
    icon: ChefHat,
    color: 'text-green-600'
  },
  {
    title: 'Пользователи',
    key: 'users',
    icon: Users,
    color: 'text-purple-600'
  },
  {
    title: 'Посещения',
    key: 'visits',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
]

export function Dashboard() {
  const { dashboardData, loading: dashboardLoading, error: dashboardError } = useDashboard()
  const { restaurants, loading: restaurantsLoading } = useRestaurants({ limit: 5 })

  if (dashboardError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Дашборд</h1>
            <p className="text-muted-foreground">Обзор системы FoodHunter</p>
          </div>
        </div>
        
        <Card>
          <CardContent className="flex items-center space-x-2 p-6">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <div>
              <p className="font-medium">Ошибка загрузки данных</p>
              <p className="text-sm text-muted-foreground">
                Не удалось подключиться к API. Проверьте подключение к интернету.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Дашборд</h1>
          <p className="text-muted-foreground">Обзор системы FoodHunter</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Добавить ресторан
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              {dashboardLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">
                    {dashboardData?.stats?.[stat.key]?.count || '0'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">
                      {dashboardData?.stats?.[stat.key]?.change || '+0%'}
                    </span> за месяц
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Restaurants */}
        <Card>
          <CardHeader>
            <CardTitle>Последние рестораны</CardTitle>
            <CardDescription>
              Недавно добавленные заведения
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {restaurantsLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <div className="flex space-x-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                ))
              ) : restaurants.length > 0 ? (
                restaurants.slice(0, 3).map((restaurant) => (
                  <div key={restaurant.id} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Store className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {restaurant.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {restaurant.city?.name || 'Не указан'} • {restaurant.type?.name || 'Не указан'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Активен
                      </span>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Нет данных о ресторанах</p>
              )}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                Посмотреть все рестораны
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
            <CardDescription>
              Часто используемые операции
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col">
                <Store className="w-6 h-6 mb-2" />
                <span className="text-sm">Добавить ресторан</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <ChefHat className="w-6 h-6 mb-2" />
                <span className="text-sm">Создать блюдо</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <Users className="w-6 h-6 mb-2" />
                <span className="text-sm">Управление пользователями</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <TrendingUp className="w-6 h-6 mb-2" />
                <span className="text-sm">Отчеты</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

