interface ISetAuth {
  user: any
  access_token: string
  refresh_token: string
}

const storage = {
  ...localStorage,
  setItem: (key: string, value: string) => localStorage.setItem(key, value),
  getItem: (key: string) => localStorage.getItem(key),
  removeItem: (key: string) => localStorage.removeItem(key),
}

export const setAuth = ({ user, access_token, refresh_token }: ISetAuth) => {
  const newUser = JSON.stringify(user)
  storage.setItem("@whonba:user", newUser)
  storage.setItem("@whonba:access_token", access_token)
  storage.setItem("@whonba:refresh_token", refresh_token)
}

export const setAccessToken = (access_token: string) => {
  storage.setItem("@whonba:access_token", access_token)
}

export const setRefreshToken = (refresh_token: string) => {
  storage.setItem("@whonba:refresh_token", refresh_token)
}

export const setUser = (user: any) => {
  const newUser = JSON.stringify(user)
  storage.setItem("@whonba:user", newUser)
}

export const setOrganization = (organization: any) => {
  const newOrganization = JSON.stringify(organization)
  storage.setItem("@whonba:organization", newOrganization)
}

export const removeAuth = () => {
  storage.removeItem("@whonba:user")
  storage.removeItem("@whonba:access_token")
  storage.removeItem("@whonba:refresh_token")
  storage.removeItem("@whonba:organization")
}

export const getUser = () => storage.getItem("@whonba:user")
export const getOrganization = () =>
  JSON.parse(String(storage.getItem("@whonba:organization")))
export const getAccessToken = () => storage.getItem("@whonba:access_token")
export const getRefreshToken = () => storage.getItem("@whonba:refresh_token")

export const getAuth = () => {
  const user = getUser()
  const access_token = getAccessToken()
  const refresh_token = getRefreshToken()

  return { user: JSON.parse(String(user)), access_token, refresh_token }
}
