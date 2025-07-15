import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleAddRestaurant = () => {
    // TODO: Implement add restaurant modal
    console.log('Add restaurant')
  }

  const handleAddDish = () => {
    // TODO: Implement add dish modal
    console.log('Add dish')
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onAddRestaurant={handleAddRestaurant}
          onAddDish={handleAddDish}
        />
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

