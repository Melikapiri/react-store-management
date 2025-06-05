import HomeIcon from "./Icons/HomeIcon";
import UsersIcon from "./Icons/UsersIcon";
import BagIcon from "./Icons/BagIcon";
import CommentIcon from "./Icons/CommentIcon";
import Products from "./Pages/Products/Products";
import ProductIcon from "./Icons/ProductIcon";
import OffsIcon from "./Icons/OffIcon"

const menuItems = [
    {
        id: 1,
        title: 'صفحه اصلی',
        icon: <HomeIcon className="w-6 h-6" />,
        path: '/home',
    },
    {
        id: 2,
        title: 'محصولات',
        icon: <BagIcon className="w-6 h-6" />,
        path: '/product',
    },
    {
        id: 3,
        title: 'کاربران',
        icon: <UsersIcon className="w-6 h-6" />,
        path: '/users',
    },
    {
        id: 4,
        title: 'کامنت ها',
        icon: <CommentIcon className="w-6 h-6" />,
        path: '/comments',
    },
    {
        id: 5,
        title: 'سفارش ها',
        icon: <ProductIcon className="w-6 h-6" />,
        path: '/orders',
    },

];

export default menuItems;

