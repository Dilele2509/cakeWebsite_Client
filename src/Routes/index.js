//Layouts
import { AdminDefault, Blank, DefaultLayout, ProfileSidebar, Sidebar, noSlider} from "../components/Layout";

//Pages
import LoginPage from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Users/Home";
import About from "../pages/Users/About";
import {Profile, ChangeInfo, ChangePass, UserOrder, OrderDetail} from "../pages/Users/Profile";
import Contact from "../pages/Users/Contact";
import Cart from "../pages/Users/Cart";
import Product from "../pages/Users/Product";
import Product_Details from "../pages/Users/Product_Details";
import Checkout from "../pages/Users/Checkout";
import PaymentNoti from "../pages/Users/Checkout/PaymentNoti";

//Admin pages
import {AdminHome, Category, AdminProduct, Users, Feedback, Orders} from '../pages/Admin/';
// Public routes
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/login', component: LoginPage, layout: Blank},
    {path: '/sign-up', component: SignUp, layout: Blank},
    {path: '/about-us', component: About, layout:DefaultLayout},
    {path: '/user-profile', component: Profile, layout:ProfileSidebar},
    {path: '/user-profile/edit', component: ChangeInfo, layout:ProfileSidebar},
    {path: '/user-profile/security', component: ChangePass, layout:ProfileSidebar},
    {path: '/user-profile/order', component: UserOrder, layout:ProfileSidebar},
    {path: '/user-profile/order/detail', component: OrderDetail, layout:noSlider},
    {path: '/product/:cat', component: Product, layout: Sidebar},
    {path: '/product/detail/', component: Product_Details, layout: noSlider},
    {path: '/cart', component: Cart, layout: noSlider},
    {path: '/check-out', component: Checkout, layout: noSlider},
    {path: '/pay-noti', component: PaymentNoti, layout: Blank},
    {path: '/contact-us', component: Contact, layout: noSlider},
]

// Private routes
const privateRoutes = [
    {path: '/', component: AdminHome, layout: AdminDefault},
    {path: '/user', component: Users, layout: AdminDefault},
    {path: '/category', component: Category, layout: AdminDefault},
    {path: '/product', component: AdminProduct, layout: AdminDefault},
    {path: '/order', component: Orders, layout: AdminDefault},
    {path: '/feedback', component: Feedback, layout: AdminDefault}
]

export {publicRoutes, privateRoutes}