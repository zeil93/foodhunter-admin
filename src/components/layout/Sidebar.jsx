import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Store, 
  Menu, 
  ChefHat, 
  MapPin, 
  Tags, 
  DollarSign,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const menuItems = [
  {
    title: 'Дашборд',
    icon: Home,
    href: '/'
  },
  {
    title: 'Рестораны',
    icon: Store,
    href: '/restaurants'
  },
  {
    title: 'Меню',
    icon: Menu,
    href: '/menus'
  },
  {
    title: 'Блюда',
    icon: ChefHat,
    href: '/dishes'
  },
  {
    title: 'Справочники',
    icon: Settings,
    href: '/references',
    children: [
      {
        title: 'Города',
        icon: MapPin,
        href: '/references/cities'
      },
      {
        title: 'Типы ресторанов',
        icon: Store,
        href: '/references/restaurant-types'
      },
      {
        title: 'Ценовые сегменты',
        icon: DollarSign,
        href: '/references/price-segments'
      },
      {
        title: 'Теги приготовления',
        icon: Tags,
        href: '/references/cooking-tags'
      }
    ]
  }
]

export function Sidebar({ collapsed, onToggle }) {
  const [expandedItems, setExpandedItems] = useState(new Set())
  const location = useLocation()

  const toggleExpanded = (title) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(title)) {
      newExpanded.delete(title)
    } else {
      newExpanded.add(title)
    }
    setExpandedItems(newExpanded)
  }

  const isActive = (href) => {
    return location.pathname === href
  }

  return (
    <div className={cn(
      "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-sidebar-foreground">FoodHunter</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.title}>
              {item.children ? (
                <Button
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
                    collapsed && "px-2"
                  )}
                  onClick={() => toggleExpanded(item.title)}
                >
                  <item.icon className={cn("w-4 h-4", !collapsed && "mr-2")} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      <ChevronRight 
                        className={cn(
                          "w-4 h-4 transition-transform",
                          expandedItems.has(item.title) && "rotate-90"
                        )} 
                      />
                    </>
                  )}
                </Button>
              ) : (
                <Link to={item.href}>
                  <Button
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
                      collapsed && "px-2"
                    )}
                  >
                    <item.icon className={cn("w-4 h-4", !collapsed && "mr-2")} />
                    {!collapsed && <span className="flex-1 text-left">{item.title}</span>}
                  </Button>
                </Link>
              )}
              
              {/* Submenu */}
              {item.children && !collapsed && expandedItems.has(item.title) && (
                <ul className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <li key={child.title}>
                      <Link to={child.href}>
                        <Button
                          variant={isActive(child.href) ? "secondary" : "ghost"}
                          size="sm"
                          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
                        >
                          <child.icon className="w-3 h-3 mr-2" />
                          {child.title}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/60">
            Админ-панель FoodHunter
          </div>
        </div>
      )}
    </div>
  )
}

