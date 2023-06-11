import { Navigate } from "react-router-dom"
import { AppLayout } from "../layouts/app-layout"
import { BasePage } from "../pages/app"

export const openRoutes = [
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <BasePage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]
