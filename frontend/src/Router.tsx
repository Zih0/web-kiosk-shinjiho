import Route from './lib/router/Route'
import { Routes } from './lib/router/Routes'
import Home from './pages/Home'
import Main from './pages/Main'

const Router = () => {
  return (
    <Routes>
      <Route path="/" component={<Home />} />
      <Route path="/main" component={<Main />} />
    </Routes>
  )
}

export default Router
