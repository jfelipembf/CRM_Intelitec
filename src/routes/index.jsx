import React from "react";
import { Navigate } from "react-router-dom";

// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import Dashboard from "../pages/Dashboard/index";

// // Pipeline
import Pipeline from "../pages/Pipeline/index";
// // Filter
import Filter from "../pages/Filter/index";
// // CustomerDetail
import CustomerDetail from "../pages/CustomerDetail/index";
// // Activities
import Activities from "../pages/Activities/index";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/pipeline", component: <Pipeline /> },
  { path: "/filtrar-oportunidades", component: <Filter /> },
  { path: "/cliente/:id", component: <CustomerDetail /> },
  { path: "/atividades", component: <Activities /> },

  //   // this route should be at the end of all other routes
  //   // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
];

// export { authProtectedRoutes, publicRoutes };
export { authProtectedRoutes, publicRoutes }
