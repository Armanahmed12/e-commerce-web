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


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children : [

      {     
         path: '/',
         element: <Shop/>,
      },

      {
        path: '/order-review',
        element: <Order_Review/>,
        loader: () => fetch('products.json')
      },
      
      {
         path: '/proceed_checkout',
         element : <h2>proceed_checkout</h2>
      },
    
      {
         path : '/login',
         element : <div>Log In</div>
      }
  ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
