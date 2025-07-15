# FoodHunter API Endpoints

## Базовая информация
- **Base URL**: `https://xromconsulting.com/foodhunter/api/v1`
- **Admin Token**: `2oQia6qIlr4i34d9yHRSAliGFWBGvSFo9xCBotmL2dGOOooFZP4ldMSSbfACnrhl`
- **Authorization Header**: `Authorization: Bearer <token>`

## Основные эндпоинты

### Рестораны (Admin)
- `GET /admin/restaurants` - Список ресторанов
- `GET /admin/restaurants/{id}` - Получить ресторан по ID
- `POST /admin/restaurants` - Создать ресторан
- `PUT /admin/restaurants/{id}` - Обновить ресторан
- `DELETE /admin/restaurants/{id}` - Удалить ресторан

### Изображения ресторанов
- `GET /admin/restaurants/{id}/images` - Получить изображения ресторана
- `POST /admin/restaurants/{id}/images` - Добавить изображение к ресторану
- `GET /admin/restaurants/images` - Список всех изображений
- `GET /admin/restaurants/images/{id}` - Получить изображение по ID
- `DELETE /admin/restaurants/images/{id}` - Удалить изображение

### Меню
- `GET /admin/restaurants/{id}/menus` - Меню ресторана
- `GET /admin/restaurants/menus` - Список всех меню
- `GET /admin/restaurants/menus/{id}` - Получить меню по ID
- `POST /admin/restaurants/menus` - Создать меню
- `PUT /admin/restaurants/menus/{id}` - Обновить меню
- `DELETE /admin/restaurants/menus/{id}` - Удалить меню

### Категории меню
- `GET /admin/restaurants/menus/{id}/categories` - Категории меню
- `GET /admin/restaurants/menus/categories` - Список всех категорий
- `GET /admin/restaurants/menus/categories/{id}` - Получить категорию по ID
- `POST /admin/restaurants/menus/{id}/categories` - Создать категорию в меню
- `PUT /admin/restaurants/menus/categories/{id}` - Обновить категорию
- `DELETE /admin/restaurants/menus/categories/{id}` - Удалить категорию

### Блюда
- `GET /admin/restaurants/menus/{id}/dishes` - Блюда меню
- `GET /admin/restaurants/menus/dishes` - Список всех блюд
- `GET /admin/restaurants/menus/dishes/{id}` - Получить блюдо по ID
- `POST /admin/restaurants/menus/{id}/dishes` - Создать блюдо в меню
- `PUT /admin/restaurants/menus/dishes/{id}` - Обновить блюдо
- `DELETE /admin/restaurants/menus/dishes/{id}` - Удалить блюдо
- `PUT /admin/restaurants/menus/dishes/{id}/image` - Загрузить изображение блюда

### Справочники
- `GET /admin/cities` - Города
- `GET /admin/restaurants/types` - Типы ресторанов
- `GET /admin/price-segments` - Ценовые сегменты
- `GET /admin/cooking-tags` - Теги кулинарии
- `GET /admin/ingredients` - Ингредиенты

### Пользователи
- `GET /admin/users` - Список пользователей
- `GET /admin/users/{id}` - Получить пользователя по ID
- `PUT /admin/users/{id}` - Обновить пользователя
- `DELETE /admin/users/{id}` - Удалить пользователя

### Отчеты
- `GET /admin/reports/dashboard` - Данные дашборда

### Интеграции
- `GET /admin/integrations` - Список интеграций
- `GET /admin/integrations/{id}` - Получить интеграцию по ID
- `POST /admin/integrations` - Создать интеграцию
- `PUT /admin/integrations/{id}` - Обновить интеграцию
- `DELETE /admin/integrations/{id}` - Удалить интеграцию

## Параметры запросов

### Пагинация
- `page` - номер страницы (по умолчанию 1)
- `page_size` - размер страницы (по умолчанию 10, максимум 100)

### Сортировка
- `order` - массив строк вида `["field_name ASC|DESC"]`

### Фильтрация
- `filters` - JSON массив фильтров в формате:
  ```json
  [{"f": "field_name", "o": "operator", "v": "value"}]
  ```

## Примеры использования

### Получить список ресторанов
```bash
curl -H "Authorization: Bearer 2oQia6qIlr4i34d9yHRSAliGFWBGvSFo9xCBotmL2dGOOooFZP4ldMSSbfACnrhl" \
     -H "Accept: application/json" \
     "https://xromconsulting.com/foodhunter/api/v1/admin/restaurants"
```

### Получить ресторан по ID
```bash
curl -H "Authorization: Bearer 2oQia6qIlr4i34d9yHRSAliGFWBGvSFo9xCBotmL2dGOOooFZP4ldMSSbfACnrhl" \
     -H "Accept: application/json" \
     "https://xromconsulting.com/foodhunter/api/v1/admin/restaurants/21"
```

### Фильтрация ресторанов по названию
```bash
curl -H "Authorization: Bearer 2oQia6qIlr4i34d9yHRSAliGFWBGvSFo9xCBotmL2dGOOooFZP4ldMSSbfACnrhl" \
     -H "Accept: application/json" \
     "https://xromconsulting.com/foodhunter/api/v1/admin/restaurants?filters=[{\"f\":\"name\",\"o\":\"=\",\"v\":\"Restaurant with integration\"}]"
```

### Получить меню ресторана
```bash
curl -H "Authorization: Bearer 2oQia6qIlr4i34d9yHRSAliGFWBGvSFo9xCBotmL2dGOOooFZP4ldMSSbfACnrhl" \
     -H "Accept: application/json" \
     "https://xromconsulting.com/foodhunter/api/v1/admin/restaurants/1/menus"
```

## Исправленные проблемы

1. **401 ошибки**: Все эндпоинты теперь используют правильные пути с `/admin` префиксом
2. **Пагинация**: Хук useRestaurants теперь загружает все рестораны, а не только первую страницу
3. **Обработка данных**: Хуки правильно обрабатывают структуру ответа API с полем `items`