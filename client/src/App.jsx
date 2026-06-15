import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import MyOrders from './pages/MyOrders'
import OrderDetail from './pages/OrderDetail'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminNewProduct from './pages/admin/AdminNewProduct'
import AdminEditProduct from './pages/admin/AdminEditProduct'
import AdminOrders from './pages/admin/AdminOrders'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { AdminRoute } from './components/common/AdminRoute'
import Navbar from './components/common/Navbar'
import { useLocation } from 'react-router-dom'
import About from './pages/About'

function App() {
  const location = useLocation();
  const hideNavbar = ['/login', '/register'].includes(location.pathname) || location.pathname.startsWith('/admin');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public pages */}
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:slug' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />

        {/* User pages (protected) */}
        <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path='/orders' element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path='/orders/:id' element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />

        {/* Admin pages (protected) */}
        <Route path='/admin' element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path='/admin/products' element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path='/admin/products/new' element={<AdminRoute><AdminNewProduct /></AdminRoute>} />
        <Route path='/admin/products/:slug/edit' element={<AdminRoute><AdminEditProduct /></AdminRoute>} />
        <Route path='/admin/orders' element={<AdminRoute><AdminOrders /></AdminRoute>} />

      </Routes>
    </>
  )
}

export default App
