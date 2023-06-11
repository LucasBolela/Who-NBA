import { notifications } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons-react"
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react"
import { Outlet } from "react-router-dom"
import { fetcher } from "../lib/api"
import { UserRequest } from "../lib/api/user"
import { IUpdatePassword } from "../lib/validation/user"

interface IUserProvider {
  isLoading: boolean
  updatePassword: (arg0: IUpdatePassword) => Promise<void>
}

const UserContext = createContext({} as IUserProvider)

export const UserProvider = (props: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false)

  async function updatePassword({ password, re_password }: IUpdatePassword) {
    setIsLoading(true)
    const { data, error } = await fetcher(
      UserRequest.updatePassword({ password, re_password })
    )
    if (error) {
      setIsLoading(false)
      return notifications.show({
        title: "Erro ao alterar a senha",
        message: error.message,
        color: "red",
        icon: <IconX />,
      })
    }
    notifications.show({
      title: "Senha alterada",
      message: "Sua senha for alterada com êxito",
      color: "teal",
      icon: <IconCheck />,
    })
    close()
    return setIsLoading(false)
  }

  const value = useMemo(
    () => ({ updatePassword, isLoading }),
    [updatePassword, isLoading]
  )

  return (
    <UserContext.Provider value={value} {...props}>
      <Outlet />
    </UserContext.Provider>
  )
}

export const useUserProvider = () => {
  const { updatePassword, isLoading } = useContext(UserContext)
  return { updatePassword, isLoading }
}
