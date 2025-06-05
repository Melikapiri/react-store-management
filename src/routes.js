import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Users from "./Pages/Users/Users";
import Orders from "./Pages/Orders/Orders";
import Comments from "./Pages/Comments/Comments";
import UserProfile from "./Pages/UserProfile/UserProfile";


const RoutesElem = [
    {path: '/', element: <Home/>},
    {path: '/home', element: <Home/>},
    {path: '/product', element: <Products/>},
    {path: '/users', element: <Users/>},
    {path: '/users/:id', element: <UserProfile/>},
    {path: '/orders', element: <Orders/>},
    {path: '/comments', element: <Comments/>},
]

export default RoutesElem