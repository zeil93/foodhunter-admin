import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Phone,
  Menu,
  Tag,
  Filter,
  CalendarCheck,
  Settings,
  Image,
  Copy,
  User,
  Edit,
  Plus,
  Star,
  Check,
  X,
  DollarSign,
  Loader2,
  Building,
  Calendar,
  ImageIcon
} from 'lucide-react'
import apiService from '../services/api'

export function RestaurantView() {
  const { restaurantId } = useParams()
  const navigate = useNavigate()
  const [restaurant, setRestaurant] = useState(null)
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('info')
  const [error, setError] = useState(null)
  
  // Состояние для режима редактирования
  const [isEditing, setIsEditing] = useState(false)
  const [editedRestaurant, setEditedRestaurant] = useState(null)
  
  // Состояние для отслеживания процесса сохранения
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState(null)

  // Состояние для хранения справочников
  const [restaurantTypes, setRestaurantTypes] = useState([])
  const [priceSegments, setPriceSegments] = useState([])
  const [availableTags, setAvailableTags] = useState([])
  
  // Функция обновления поля в редактируемом ресторане
  const updateField = (field, value) => {
    if (!editedRestaurant) return;
    setEditedRestaurant(prev => ({
      ...prev,
      [field]: value
    }));
  };

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Загружаем данные ресторана
        const restaurantData = await apiService.restaurants.get(restaurantId)
        setRestaurant(restaurantData)
        
        try {
          // Загружаем меню ресторана
          if (apiService.menus && typeof apiService.menus.list === 'function') {
            const menusData = await apiService.menus.list({ restaurant_id: restaurantId })
            setMenus(menusData?.items || menusData || [])
          }
        } catch (menuError) {
          console.error('Error fetching restaurant menus:', menuError)
          // Не прерываем загрузку всей страницы из-за ошибки с меню
        }
        
        try {
          // Загружаем справочники
          if (apiService.restaurantTypes && typeof apiService.restaurantTypes.list === 'function') {
            const types = await apiService.restaurantTypes.list()
            setRestaurantTypes(types?.items || types || [])
          }
        } catch (typesError) {
          console.error('Error fetching restaurant types:', typesError)
          // Устанавливаем пустой массив, чтобы не блокировать рендеринг
          setRestaurantTypes([])
        }
        
        // Загрузка ценовых сегментов из API
        try {
          if (apiService.priceSegments && typeof apiService.priceSegments.list === 'function') {
            const segments = await apiService.priceSegments.list()
            setPriceSegments(segments?.items || segments || [])
          } else {
            // Фоллбэк, если API не доступен
            setPriceSegments([
              { id: 1, name: 'Эконом' },
              { id: 2, name: 'Средний' },
              { id: 3, name: 'Бизнес' },
              { id: 4, name: 'Премиум' }
            ])
          }
        } catch (segmentsError) {
          console.error('Error fetching price segments:', segmentsError)
          // Устанавливаем данные по умолчанию
          setPriceSegments([
            { id: 1, name: 'Эконом' },
            { id: 2, name: 'Средний' },
            { id: 3, name: 'Бизнес' },
            { id: 4, name: 'Премиум' }
          ])
        }
        
        try {
          // Загружаем кулинарные теги
          if (apiService.cookingTags && typeof apiService.cookingTags.list === 'function') {
            const tags = await apiService.cookingTags.list()
            setAvailableTags(tags?.items || tags || [])
          }
        } catch (tagsError) {
          console.error('Error fetching cooking tags:', tagsError)
          // Устанавливаем пустой массив, чтобы не блокировать рендеринг
          setAvailableTags([])  
        }
        
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
    <div className="space-y-6 container py-6 max-w-7xl">
      {/* Уведомления */}
      {saveSuccess && (
        <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Успешно! </strong>
          <span className="block sm:inline">Данные ресторана успешно сохранены.</span>
        </div>
      )}
      
      {saveError && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Ошибка! </strong>
          <span className="block sm:inline">{saveError}</span>
        </div>
      )}
      
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
          <Button onClick={() => {
            if (isEditing) {
              // Показываем индикатор загрузки
              setSaving(true);
              
              // Сохраняем изменения
              apiService.restaurants.update(restaurantId, editedRestaurant)
                .then(() => {
                  setRestaurant(editedRestaurant);
                  setIsEditing(false);
                  setSaveSuccess(true);
                  // Скрываем уведомление об успехе через 3 секунды
                  setTimeout(() => setSaveSuccess(false), 3000);
                })
                .catch(err => {
                  console.error('Error updating restaurant:', err);
                  setSaveError(err.message || 'Ошибка при сохранении');
                  // Скрываем уведомление об ошибке через 5 секунд
                  setTimeout(() => setSaveError(null), 5000);
                })
                .finally(() => {
                  setSaving(false);
                });
            } else {
              // Включаем режим редактирования и создаем копию данных для редактирования
              setEditedRestaurant({...restaurant});
              setIsEditing(true);
            }
          }}>
            {isEditing ? (
              <>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Сохранить
                  </>
                )}
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Редактировать
              </>
            )}
          </Button>
          {isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <X className="w-4 h-4 mr-2" />
              Отменить
            </Button>
          )}
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
                  {isEditing ? (
                    <select 
                      className="w-full border rounded p-2"
                      value={editedRestaurant.type?.id || ''}
                      onChange={(e) => {
                        const selectedType = restaurantTypes.find(type => type.id === parseInt(e.target.value));
                        updateField('type', selectedType || null);
                      }}
                    >
                      <option value="">Выберите тип</option>
                      {restaurantTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  ) : (
                    <p>{restaurant.type?.name || 'Не указан'}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-medium text-gray-500">Ценовой сегмент:</span>
                  {isEditing ? (
                    <select 
                      className="border rounded p-2"
                      value={editedRestaurant.price_segment?.id || ''}
                      onChange={(e) => {
                        const selectedSegment = priceSegments.find(segment => segment.id === parseInt(e.target.value));
                        updateField('price_segment', selectedSegment || null);
                      }}
                    >
                      <option value="">Выберите сегмент</option>
                      {priceSegments.map(segment => (
                        <option key={segment.id} value={segment.id}>{segment.name}</option>
                      ))}
                    </select>
                  ) : (
                    <span>{restaurant.price_segment?.name || 'Не указан'}</span>
                  )}
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
                
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-1" />
                  <div className="w-full">
                    <label className="text-sm font-medium text-gray-500">Телефоны</label>
                    {isEditing ? (
                      <div className="space-y-2">
                        {editedRestaurant.phone_numbers && editedRestaurant.phone_numbers.map((phone, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              className="border rounded p-2 flex-grow"
                              value={phone}
                              onChange={(e) => {
                                const newPhones = [...editedRestaurant.phone_numbers];
                                newPhones[index] = e.target.value;
                                updateField('phone_numbers', newPhones);
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newPhones = [...editedRestaurant.phone_numbers];
                                newPhones.splice(index, 1);
                                updateField('phone_numbers', newPhones);
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => {
                            const newPhones = [...(editedRestaurant.phone_numbers || [])];
                            newPhones.push('');
                            updateField('phone_numbers', newPhones);
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Добавить телефон
                        </Button>
                      </div>
                    ) : (
                      <div>
                        {restaurant.phone_numbers && restaurant.phone_numbers.length > 0 ? (
                          restaurant.phone_numbers.map((phone, index) => (
                            <p key={index}>{phone}</p>
                          ))
                        ) : (
                          <p>Не указаны</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-1" />
                  <div className="w-full">
                    <label className="text-sm font-medium text-gray-500">Время работы</label>
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          className="border rounded p-2 w-full"
                          placeholder="Например: 09:00-23:00"
                          value={editedRestaurant.working_hours || ''}
                          onChange={(e) => updateField('working_hours', e.target.value)}
                        />
                        
                        <label className="text-sm font-medium text-gray-500 block mt-3">Дни работы</label>
                        <div className="flex flex-wrap gap-2">
                          {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map((day, index) => {
                            const isSelected = editedRestaurant.working_days?.includes(day);
                            return (
                              <Badge 
                                key={index} 
                                variant={isSelected ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => {
                                  const days = [...(editedRestaurant.working_days || [])];
                                  if (isSelected) {
                                    updateField('working_days', days.filter(d => d !== day));
                                  } else {
                                    days.push(day);
                                    updateField('working_days', days);
                                  }
                                }}
                              >
                                {day}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm">{formatWorkingHours(restaurant.working_hours)}</p>
                        {restaurant.working_days && restaurant.working_days.length > 0 && (
                          <p className="text-sm">Дни: {restaurant.working_days.join(', ')}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cooking Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Кулинарные теги
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {editedRestaurant.cooking_tags && editedRestaurant.cooking_tags.map((tag) => (
                      <Badge key={tag.id} variant="default" className="flex items-center gap-1 pr-1">
                        {tag.image_url && (
                          <img src={tag.image_url} alt={tag.name} className="w-4 h-4 rounded" />
                        )}
                        {tag.name}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-5 w-5 p-0 ml-1"
                          onClick={() => {
                            const newTags = editedRestaurant.cooking_tags.filter(t => t.id !== tag.id);
                            updateField('cooking_tags', newTags);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="border rounded p-3">
                    <label className="text-sm font-medium text-gray-500 block mb-2">Добавить теги</label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags
                        .filter(tag => !editedRestaurant.cooking_tags?.some(t => t.id === tag.id))
                        .map((tag) => (
                          <Badge 
                            key={tag.id} 
                            variant="outline" 
                            className="flex items-center gap-1 cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            onClick={() => {
                              const newTags = [...(editedRestaurant.cooking_tags || []), tag];
                              updateField('cooking_tags', newTags);
                            }}
                          >
                            {tag.image_url && (
                              <img src={tag.image_url} alt={tag.name} className="w-4 h-4 rounded" />
                            )}
                            {tag.name}
                            <Plus className="h-3 w-3 ml-1" />
                          </Badge>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {restaurant.cooking_tags && restaurant.cooking_tags.length > 0 ? restaurant.cooking_tags.map((tag) => (
                    <Badge key={tag.id} variant="outline" className="flex items-center gap-1">
                      {tag.image_url && (
                        <img src={tag.image_url} alt={tag.name} className="w-4 h-4 rounded" />
                      )}
                      {tag.name}
                    </Badge>
                  )) : (
                    <p className="text-muted-foreground">Нет тегов</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
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

