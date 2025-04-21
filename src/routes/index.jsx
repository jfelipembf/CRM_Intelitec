import React from "react";
import { Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard/index";

// // Pipeline
import Pipeline from "../pages/Pipeline/index";
// // Filter
import Filter from "../pages/Filter/index";
// // CustomerDetail
import CustomerDetail from "../pages/CustomerDetail/index";
// // Activities
import Activities from "../pages/Activities/index";
// // Clients
import Clients from "../pages/Clients/index";
import ClientForm from "../components/Clients/ClientForm";
// // Employees
import Employees from "../pages/Employees/index";
import EmployeeForm from "../pages/Employees/EmployeeForm";
// // Messages
import Messages from "../pages/Messages/index";
import Attendance from "../pages/Attendance/index";
// // Goals (Metas)
import Goals from "../pages/Goals/index";
import NewGoal from "../components/Goals/NewGoal";
import EditGoal from "../components/Goals/EditGoal";
import GoalDetail from "../components/Goals/GoalDetail";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/pipeline", component: <Pipeline /> },
  { path: "/filtrar-oportunidades", component: <Filter /> },
  { path: "/cliente/:id", component: <CustomerDetail /> },
  { path: "/atividades", component: <Activities /> },
  { path: "/clientes", component: <Clients /> },
  { path: "/clientes/add/:type", component: <ClientForm /> },
  // Rotas de Colaboradores
  { path: "/employees", component: <Employees /> },
  { path: "/colaboradores", component: <Employees /> },
  { path: "/colaboradores/add", component: <EmployeeForm /> },
  { path: "/colaboradores/edit/:id", component: <EmployeeForm /> },
  { path: "/colaborador/:id", component: <CustomerDetail /> }, // Reaproveitando o componente CustomerDetail
  // Rotas de Mensagens
  { path: "/mensagens", component: <Messages /> },
  { path: "/atendimento/:id", component: <Attendance /> },
  // Rotas de Metas
  { path: "/metas", component: <Goals /> },
  { path: "/metas/nova", component: <NewGoal /> },
  { path: "/metas/editar/:id", component: <EditGoal /> },
  { path: "/metas/:id", component: <GoalDetail /> },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [];

// export { authProtectedRoutes, publicRoutes };
export { authProtectedRoutes, publicRoutes }
