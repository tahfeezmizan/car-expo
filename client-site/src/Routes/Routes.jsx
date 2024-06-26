import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import CheckOut from "../Pages/CheckOut/CheckOut";
import BookServices from "../Pages/BookServices/BookServices";
import BookingServices from "../Pages/BookingServices/BookingServices";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/bookings/:id',
                element: <PrivateRoutes><BookServices /></PrivateRoutes>,
            },
            {
                path: 'bookings',
                element: <PrivateRoutes><BookingServices></BookingServices></PrivateRoutes>,
            },
        ]
    },
]);

export default router;