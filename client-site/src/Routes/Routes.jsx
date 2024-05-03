import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import CheckOut from "../Pages/CheckOut/CheckOut";
import BookServices from "../Pages/BookServices/BookServices";

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
            // {
            //     path: '/checkout/:id',
            //     element: <CheckOut />,
            // },
            {
                path: '/bookings/:id',
                element: <BookServices />
            }
        ]
    },
]);

export default router;