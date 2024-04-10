import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './components/Home/Home.jsx';
import Shop from './components/Shop/Shop.jsx';
import Order_Review from './components/Order_Review/Order_Review.jsx';
import Register from './layouts/Register/Register.jsx';
import LogIn from './layouts/LogIn/LogIn.jsx';
import AuthInfoProvider from './inforProviders/AuthInfoProvider.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import CheckOut from './components/CheckOut/CheckOut.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [

      {
        path: '/',
        element: <Shop />,
        loader: ()=> fetch('http://localhost:3500/totalProducts')
      },

      {
        path: '/order-review',
        element: <Order_Review />,

      },

      {
        path: '/proceed_checkout',
        element: <PrivateRoute><CheckOut/></PrivateRoute>
      },

      {
        path: '/login',
        element: <LogIn />
      },

      {
        path: '/register',
        element: <Register />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthInfoProvider>
      <RouterProvider router={router} />
    </AuthInfoProvider>
  </React.StrictMode>,
)
