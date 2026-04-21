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

function App() {

  return (
    <>
      <Routes>
        {/* Public pages */}
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:slug' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* User pages (protected) */}
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orders' element={<MyOrders />} />
        <Route path='/orders/:id' element={<OrderDetail />} />

        {/* Admin pages (protected) */}
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/products' element={<AdminProducts />} />
        <Route path='/admin/products/new' element={<AdminNewProduct />} />
        <Route path='/admin/products/:slug/edit' element={<AdminEditProduct />} />
        <Route path='/admin/orders' element={<AdminOrders />} />

      </Routes>
    </>
  )
}

export default App
