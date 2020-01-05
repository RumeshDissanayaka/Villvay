import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import Home from '../components/Home/Home';
import ErrorPage from '../components/Error/ErrorPage';

const routers = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '*',
    component: ErrorPage
  }
]



export default routers