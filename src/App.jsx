import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './pages/Dashboard'
import { Restaurants } from './pages/Restaurants'
import { RestaurantDetail } from './pages/RestaurantDetail'
import { MenuDetail } from './pages/MenuDetail'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:restaurantId" element={<RestaurantDetail />} />
          <Route path="/restaurants/:restaurantId/menus/:menuId" element={<MenuDetail />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
