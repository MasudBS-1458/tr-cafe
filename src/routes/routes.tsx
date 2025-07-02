import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyOTP from "../pages/auth/VerifyOTP";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/user/Profile";
import Notifications from "../pages/notification/Notifications";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/user/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/user/notifications",
        element: (
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        ),
      },
      {
        path: "/carts",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "verify-otp",
        element: <VerifyOTP />,
      },
    ],
  },
]);

export default router;