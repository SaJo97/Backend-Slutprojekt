import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./components/Register";
import Account from "./pages/Account";
import OrderHistory from "./pages/OrderHistory";
import OrderInfo from "./components/OrderInfo";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "product/:productId",
        element: <ProductDetails />,
      },
      {
        path: "checkout",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "orderhistory",
        element: (
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <ProtectedRoute>
            <OrderInfo />
          </ProtectedRoute>
        ),
      },
      {
        path: "*", // Catch-all route for unknown paths
        element: <NotFound />, // Render the NotFound component
      },
    ],
  },
]);
