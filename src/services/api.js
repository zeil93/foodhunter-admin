const API_BASE_URL = 'https://xromconsulting.com/foodhunter/api/v1'
const ADMIN_TOKEN = '2oQia6qIlr4i34d9yHRSAliGFWBGvSFo9xCBotmL2dGOOooFZP4ldMSSbfACnrhl'

// Swagger документация доступна по адресу: https://xromconsulting.com/foodhunter/swagger/
// Полная спецификация API сохранена в файле api-spec.json

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
    this.token = ADMIN_TOKEN
  }

  // Базовый метод для выполнения HTTP запросов
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Методы для работы с ресторанами
  restaurants = {
    // Получить список ресторанов
    list: async (params = {}) => {
      const queryParams = new URLSearchParams(params).toString()
      const endpoint = `/admin/restaurants${queryParams ? `?${queryParams}` : ''}`
      return this.request(endpoint)
    },

    // Получить ресторан по ID
    get: async (id) => {
      return this.request(`/admin/restaurants/${id}`)
    },

    // Создать новый ресторан
    create: async (data) => {
      return this.request('/admin/restaurants', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },

    // Обновить ресторан
    update: async (id, data) => {
      return this.request(`/admin/restaurants/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
    },

    // Удалить ресторан
    delete: async (id) => {
      return this.request(`/admin/restaurants/${id}`, {
        method: 'DELETE',
      })
    },

    // Получить изображения ресторана
    getImages: async (id) => {
      return this.request(`/admin/restaurants/${id}/images`)
    },

    // Добавить изображение к ресторану
    addImage: async (id, imageData) => {
      return this.request(`/admin/restaurants/${id}/images`, {
        method: 'POST',
        body: JSON.stringify(imageData),
      })
    },
  }

  // Методы для работы с меню
  menus = {
    // Получить список меню
    list: async (params = {}) => {
      const queryParams = new URLSearchParams(params).toString()
      const endpoint = `/admin/restaurants/menus${queryParams ? `?${queryParams}` : ''}`
      return this.request(endpoint)
    },

    // Получить меню по ID
    get: async (id) => {
      return this.request(`/admin/restaurants/menus/${id}`)
    },

    // Создать новое меню
    create: async (data) => {
      return this.request('/admin/restaurants/menus', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },

    // Обновить меню
    update: async (id, data) => {
      return this.request(`/admin/restaurants/menus/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
    },

    // Удалить меню
    delete: async (id) => {
      return this.request(`/admin/restaurants/menus/${id}`, {
        method: 'DELETE',
      })
    },

    // Получить меню ресторана
    getByRestaurant: async (restaurantId) => {
      return this.request(`/admin/restaurants/${restaurantId}/menus`)
    },
  }

  // Методы для работы с категориями
  categories = {
    // Получить список категорий
    list: async (params = {}) => {
      const queryParams = new URLSearchParams(params).toString()
      const endpoint = `/admin/restaurants/menus/categories${queryParams ? `?${queryParams}` : ''}`
      return this.request(endpoint)
    },

    // Получить категорию по ID
    get: async (id) => {
      return this.request(`/admin/restaurants/menus/categories/${id}`)
    },

    // Создать новую категорию
    create: async (menuId, data) => {
      return this.request(`/admin/restaurants/menus/${menuId}/categories`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },

    // Обновить категорию
    update: async (id, data) => {
      return this.request(`/admin/restaurants/menus/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
    },

    // Удалить категорию
    delete: async (id) => {
      return this.request(`/admin/restaurants/menus/categories/${id}`, {
        method: 'DELETE',
      })
    },

    // Получить категории меню
    getByMenu: async (menuId) => {
      return this.request(`/admin/restaurants/menus/${menuId}/categories`)
    },
  }

  // Методы для работы с блюдами
  dishes = {
    // Получить список блюд
    list: async (params = {}) => {
      const queryParams = new URLSearchParams(params).toString()
      const endpoint = `/admin/restaurants/menus/dishes${queryParams ? `?${queryParams}` : ''}`
      return this.request(endpoint)
    },

    // Получить блюдо по ID
    get: async (id) => {
      return this.request(`/admin/restaurants/menus/dishes/${id}`)
    },

    // Создать новое блюдо
    create: async (menuId, data) => {
      return this.request(`/admin/restaurants/menus/${menuId}/dishes`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },

    // Обновить блюдо
    update: async (id, data) => {
      return this.request(`/admin/restaurants/menus/dishes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
    },

    // Удалить блюдо
    delete: async (id) => {
      return this.request(`/admin/restaurants/menus/dishes/${id}`, {
        method: 'DELETE',
      })
    },

    // Получить блюда меню
    getByMenu: async (menuId) => {
      return this.request(`/admin/restaurants/menus/${menuId}/dishes`)
    },

    // Получить блюда категории
    getByCategory: async (categoryId) => {
      return this.request(`/admin/restaurants/menus/categories/${categoryId}/dishes`)
    },

    // Получить блюда ресторана
    getByRestaurant: async (restaurantId) => {
      return this.request(`/admin/restaurants/${restaurantId}/dishes`)
    },

    // Добавить изображение к блюду
    addImage: async (id, imageData) => {
      return this.request(`/admin/restaurants/menus/dishes/${id}/image`, {
        method: 'PUT',
        body: JSON.stringify(imageData),
      })
    },

    // Получить изображение блюда
    getImage: async (id) => {
      return this.request(`/admin/restaurants/menus/dishes/${id}/image`)
    },
  }

  // Методы для работы со справочниками
  references = {
    // Города
    cities: {
      list: async () => this.request('/admin/cities'),
      get: async (id) => this.request(`/admin/cities/${id}`),
      create: async (data) => this.request('/admin/cities', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
      update: async (id, data) => this.request(`/admin/cities/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
      delete: async (id) => this.request(`/admin/cities/${id}`, {
        method: 'DELETE',
      }),
    },

    // Типы ресторанов
    restaurantTypes: {
      list: async () => this.request('/admin/restaurants/types'),
      get: async (id) => this.request(`/admin/restaurants/types/${id}`),
      create: async (data) => this.request('/admin/restaurants/types', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
      update: async (id, data) => this.request(`/admin/restaurants/types/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
      delete: async (id) => this.request(`/admin/restaurants/types/${id}`, {
        method: 'DELETE',
      }),
    },

    // Ценовые сегменты
    priceSegments: {
      list: async () => this.request('/admin/price-segments'),
      get: async (id) => this.request(`/admin/price-segments/${id}`),
      create: async (data) => this.request('/admin/price-segments', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
      update: async (id, data) => this.request(`/admin/price-segments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
      delete: async (id) => this.request(`/admin/price-segments/${id}`, {
        method: 'DELETE',
      }),
    },

    // Теги приготовления
    cookingTags: {
      list: async () => this.request('/admin/cooking-tags'),
      get: async (id) => this.request(`/admin/cooking-tags/${id}`),
      create: async (data) => this.request('/admin/cooking-tags', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
      update: async (id, data) => this.request(`/admin/cooking-tags/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
      delete: async (id) => this.request(`/admin/cooking-tags/${id}`, {
        method: 'DELETE',
      }),
    },

    // Ингредиенты
    ingredients: {
      list: async () => this.request('/admin/ingredients'),
      get: async (id) => this.request(`/admin/ingredients/${id}`),
      create: async (data) => this.request('/admin/ingredients', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
      update: async (id, data) => this.request(`/admin/ingredients/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
      delete: async (id) => this.request(`/admin/ingredients/${id}`, {
        method: 'DELETE',
      }),
    },
  }

  // Методы для работы с отчетами
  reports = {
    // Получить данные дашборда
    dashboard: async () => {
      return this.request('/admin/reports/dashboard')
    },
  }

  // Методы для работы с пользователями
  users = {
    // Получить список пользователей
    list: async (params = {}) => {
      const queryParams = new URLSearchParams(params).toString()
      const endpoint = `/admin/users${queryParams ? `?${queryParams}` : ''}`
      return this.request(endpoint)
    },

    // Получить пользователя по ID
    get: async (id) => {
      return this.request(`/admin/users/${id}`)
    },

    // Обновить пользователя
    update: async (id, data) => {
      return this.request(`/admin/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
    },

    // Удалить пользователя
    delete: async (id) => {
      return this.request(`/admin/users/${id}`, {
        method: 'DELETE',
      })
    },
  }
}

// Создаем единственный экземпляр API сервиса
const apiService = new ApiService()

export default apiService

