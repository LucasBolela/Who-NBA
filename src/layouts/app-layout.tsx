import { PropsWithChildren } from "react"
import { Outlet } from "react-router-dom"
import { DashboardNavbar } from "../components/dashboard/dashboard-navbar"

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="bg-[#0A1B2C] text-white w-full min-h-screen flex">
      {/* <DashboardNavbar /> */}
      <Outlet />
      {children}
    </main>
  )
}
