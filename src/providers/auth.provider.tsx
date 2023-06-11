import { notifications } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons-react"
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react"
import { useNavigate } from "react-router-dom"
import { fetcher } from "../lib/api"
import { AuthRequest } from "../lib/api/auth"
import { UserRequest } from "../lib/api/user"
import {
  removeAuth,
  setAccessToken,
  setRefreshToken,
  setUser,
} from "../lib/auth/storage"
import { ILogin, IRegister, IValidateEmail } from "../lib/validation/auth"

interface IAuthContext {
  login: (arg0: ILogin) => void
  register: (arg0: IRegister) => void
  superRegister: (arg0: IRegister) => void
  logout: () => void
  validateEmail: (arg0: IValidateEmail) => void
  resendEmail: (arg0: string) => void
  isLoading: boolean
}

const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = (props: PropsWithChildren) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  async function login({ email, password }: ILogin) {
    setIsLoading(true)
    const { data: loginData, error: loginError } = await fetcher(
      AuthRequest.login({ email, password })
    )
    if (loginError) {
      setIsLoading(false)
      return notifications.show({
        title: "Erro ao logar",
        message: loginError.message,
        color: "red",
        icon: <IconX />,
      })
    }
    const access_token = loginData.access_token
    const refresh_token = loginData.refresh_token
    setAccessToken(access_token)
    setRefreshToken(refresh_token)

    const { data: userData, error: userError } = await fetcher(
      UserRequest.getInfo()
    )
    if (userError) {
      setIsLoading(false)
      notifications.show({
        title: "Erro ao logar",
        message: userError.message,
        color: "red",
        icon: <IconX />,
      })
      return notifications.show({
        title: "Aguarde",
        message:
          "Você será redirecionado para a página de verificação de e-mail",
        loading: true,
        onClose: () => {
          return navigate(`/register/validate?ref=${email}`)
        },
      })
    }

    const user = userData
    setUser(user)
    navigate("/dashboard")
    return setIsLoading(false)
  }

  async function logout() {
    setIsLoading(true)
    await AuthRequest.logout()
    removeAuth()
    navigate("/login")
    return setIsLoading(false)
  }

  async function register({
    cpf_cnpj,
    email,
    name,
    password,
    phone,
  }: IRegister) {
    setIsLoading(true)
    const { error, data } = await fetcher(
      AuthRequest.register({ cpf_cnpj, email, name, password, phone })
    )
    if (error) {
      setIsLoading(false)
      return notifications.show({
        title: "Erro ao cadastrar",
        message: error.message,
        color: "red",
        icon: <IconX />,
      })
    }
    const access_token = data.access_token
    const refresh_token = data.refresh_token
    setAccessToken(access_token)
    setRefreshToken(refresh_token)
    navigate(`/register/validate?ref=${email}`)
    return setIsLoading(false)
  }

  async function superRegister({
    cpf_cnpj,
    email,
    name,
    password,
    phone,
  }: IRegister) {
    setIsLoading(true)
    const { error, data } = await fetcher(
      AuthRequest.superRegister({ cpf_cnpj, email, name, password, phone })
    )
    if (error) {
      setIsLoading(false)
      return notifications.show({
        title: "Erro ao cadastrar",
        message: error.message,
        color: "red",
        icon: <IconX />,
      })
    }
    const access_token = data.access_token
    const refresh_token = data.refresh_token
    setAccessToken(access_token)
    setRefreshToken(refresh_token)
    navigate(`/register/validate?ref=${email}`)
    return setIsLoading(false)
  }

  async function validateEmail({ validation_number }: IValidateEmail) {
    setIsLoading(true)
    const { data: validateData, error: validateError } = await fetcher(
      AuthRequest.validateEmail({ validation_number })
    )
    if (validateError) {
      setIsLoading(false)
      return notifications.show({
        title: "Erro ao validar e-mail",
        message: validateError.message,
        color: "red",
        icon: <IconX />,
      })
    }
    const { data: userData, error: userError } = await fetcher(
      UserRequest.getInfo()
    )
    if (userError) {
      setIsLoading(false)
      return notifications.show({
        title: "Erro ao validar e-mail",
        message: userError.message,
        color: "red",
        icon: <IconX />,
      })
    }
    const user = userData
    notifications.show({
      message: validateData.message,
      color: "teal",
      icon: <IconCheck />,
    })
    setUser(user)
    navigate("/dashboard")
    return setIsLoading(false)
  }
  async function resendEmail(email: string) {
    setIsLoading(true)
    notifications.show({
      title: "Enviando código de verificação",
      id: "send-email",
      loading: true,
      message: "Aguarde, estamos enviado seu código de verificação",
      color: "teal",
      icon: <IconCheck />,
    })
    const { data, error } = await fetcher(AuthRequest.resendEmail(email))
    if (error) {
      setIsLoading(false)
      return notifications.update({
        title: "Erro ao enviar o código de validação",
        id: "send-email",
        message: error.message,
        color: "red",
        icon: <IconX />,
      })
    }
    setIsLoading(false)
    notifications.update({
      id: "send-email",
      title: "Código enviado com sucesso",
      message: "Verifique a caixa de entrada de seu e-mail",
      color: "teal",
      icon: <IconCheck />,
    })
  }

  const value = useMemo(
    () => ({
      login,
      logout,
      register,
      isLoading,
      validateEmail,
      resendEmail,
      superRegister,
    }),
    [
      isLoading,
      login,
      logout,
      register,
      validateEmail,
      resendEmail,
      superRegister,
    ]
  )

  return <AuthContext.Provider value={value} {...props} />
}

export const useAuth = () => {
  const {
    login,
    logout,
    register,
    isLoading,
    validateEmail,
    resendEmail,
    superRegister,
  } = useContext(AuthContext)

  return {
    login,
    logout,
    register,
    isLoading,
    validateEmail,
    resendEmail,
    superRegister,
  }
}
