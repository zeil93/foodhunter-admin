import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import RestaurantsSimple from './pages/RestaurantsSimple'
import RestaurantView from './pages/RestaurantView'
import { RestaurantDetail } from './pages/RestaurantDetailSimple'
import { MenuDetail } from './pages/MenuDetail'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/restaurants" element={<RestaurantsSimple />} />
          <Route path="/restaurants/:restaurantId" element={<RestaurantView />} />
          <Route path="/restaurants/:restaurantId/menus/:menuId" element={<MenuDetail />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
