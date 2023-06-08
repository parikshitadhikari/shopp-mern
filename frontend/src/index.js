import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App.js";
import "bootstrap/dist/css/bootstrap.min.css"; //importing bootstrap css
import "./index.css";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
    {/* doing index=true prevents display of multiple screen on same path */}
    <Route index={true} path="/" element={<HomeScreen />}/>
    <Route path="/product/:id" element={<ProductScreen />}/>
    </Route>

  )
)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  {/* providing router as a prop */}
    <RouterProvider router={router}/>
  </React.StrictMode>
)
