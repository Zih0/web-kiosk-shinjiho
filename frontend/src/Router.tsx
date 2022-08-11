import CartProvider from './contexts/CartContext'
import Route from './lib/router/Route'
import { Routes } from './lib/router/Routes'
import Home from './pages/Home'
import Main from './pages/Main'

const Router = () => {
  return (
    <Routes>
      <Route path="/" component={<Home />} />
      <CartProvider>
        <Route path="/main" component={<Main />} />
      </CartProvider>
    </Routes>
  )
}

export default Router
