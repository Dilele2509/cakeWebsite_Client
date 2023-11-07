//Layouts
import { DefaultLayout } from "../components/Layout";
import { noSlider } from "../components/Layout";
import {Sidebar} from "../components/Layout";
import {Blank} from '../components/Layout';


//Pages
import LoginPage from "../pages/Login";
import Home from "../pages/Users/Home";
import About from "../pages/Users/About";
import Account from "../pages/Users/Account";
import Contact from "../pages/Users/Contact";
import Cart from "../pages/Users/Cart";
import Product from "../pages/Users/Product";
import Product_Details from "../pages/Users/Product_Details";
// Public routes
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/login', component: LoginPage, layout: Blank},
    {path: '/about-us', component: About, layout:DefaultLayout},
    {path: '/account', component: Account, layout:noSlider},
    {path: '/product/:cat', component: Product, layout: Sidebar},
    {path: '/product/detail/:productId', component: Product_Details, layout: noSlider},
    {path: '/cart', component: Cart, layout: noSlider},
    {path: '/contact-us', component: Contact, layout: noSlider},
]

// Private routes
const privateRoutes = [

]

export {publicRoutes, privateRoutes}