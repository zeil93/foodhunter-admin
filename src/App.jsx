import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './pages/Dashboard'
import { Restaurants } from './pages/Restaurants'
import { Menus } from './pages/Menus'
import { Dishes } from './pages/Dishes'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/dishes" element={<Dishes />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
