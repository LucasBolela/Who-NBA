/* eslint-disable react/display-name */

import { FC } from "react"
import { Outlet } from "react-router-dom"
import { OrganizationsProvider } from "./organizations-provider"
import { UserProvider } from "./user-provider"

export const combineProviders = (...components: FC<any>[]): FC => {
  return components.reverse().reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }: any): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>
              {children}
              <Outlet />
            </CurrentComponent>
          </AccumulatedComponents>
        )
      }
    },
    ({ children }) => <>{children}</>
  )
}

const providers = [UserProvider, OrganizationsProvider]

export const AppProvider = combineProviders(...providers)
