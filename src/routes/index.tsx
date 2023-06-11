import { Outlet } from "react-router-dom"
import { openRoutes } from "./open-routes"

export const routes = [
  {
    element: <Outlet />,
    children: [...openRoutes],
  },
  { path: "*", element: <h1>You gone too far.</h1> },
]
