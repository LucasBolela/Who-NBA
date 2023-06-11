import { notifications } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons-react"
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query"
import { createContext, PropsWithChildren, useContext, useMemo } from "react"
import { Outlet } from "react-router-dom"
import { OrganizationRequest } from "../lib/api/organization"
import { getOrganization } from "../lib/auth/storage"
import {
  IInviteNewMember,
  IUpdateOrganization,
} from "../lib/validation/organization"

interface IOrganizationsProvider {
  listOrganizations: UseQueryResult<any, unknown>
  deleteOrganization: UseMutationResult<any, any, void, unknown>
  inviteNewMember: UseMutationResult<
    any,
    any,
    {
      email: string
    },
    unknown
  >
  updateOrganization: UseMutationResult<
    any,
    any,
    {
      new_name?: string | undefined
    },
    unknown
  >
  currentOrganization: {
    name: string
    id: number
  }
}

const OrganizationsContext = createContext({} as IOrganizationsProvider)

export const OrganizationsProvider = (props: PropsWithChildren) => {
  const currentOrganization = getOrganization()

  const listOrganizations = useQuery({
    queryKey: ["listOrganizations"],
    queryFn: () => OrganizationRequest.listOrganizations(""),
  })

  const inviteNewMember = useMutation({
    mutationKey: ["inviteNewMember"],
    mutationFn: ({ email }: IInviteNewMember) =>
      OrganizationRequest.inviteNewMember({ email }),
    onSuccess: () => {
      notifications.show({
        title: "Convite enviado",
        message:
          "O convite foi enviado com sucesso. Aguarde até que o usuário aceite-o",
        color: "teal",
        icon: <IconCheck />,
      })
    },
    onError: (error: any) => {
      notifications.show({
        title: "Erro ao enviar convite",
        message: error.response.data.message,
        color: "red",
        icon: <IconX />,
      })
    },
  })

  const updateOrganization = useMutation({
    mutationKey: ["updateOrganization"],
    mutationFn: ({ new_name }: IUpdateOrganization) =>
      OrganizationRequest.updateOrganization({ new_name }),
    onSuccess: () => {
      notifications.show({
        title: "Organização atualizada",
        message: "A organização foi atualizada com êxito",
        color: "teal",
        icon: <IconCheck />,
      })
    },
    onError: (error: any) => {
      notifications.show({
        title: "Erro ao atualizar organização",
        message: error.response.data.message,
        color: "red",
        icon: <IconX />,
      })
    },
  })

  const deleteOrganization = useMutation({
    mutationKey: ["deleteOrganization"],
    mutationFn: () => OrganizationRequest.deleteOrganization(),
    onSuccess: () => {
      notifications.show({
        title: "Organização excluida com sucesso",
        message: "A organização foi excluida com êxito",
        color: "teal",
        icon: <IconCheck />,
      })
    },
    onError: (error: any) => {
      notifications.show({
        title: "Erro ao excluir organização",
        message: error.response.data.message,
        color: "red",
        icon: <IconX />,
      })
    },
  })

  const value = useMemo(
    () => ({
      listOrganizations,
      currentOrganization,
      updateOrganization,
      deleteOrganization,
      inviteNewMember,
    }),
    [
      listOrganizations,
      currentOrganization,
      updateOrganization,
      deleteOrganization,
      inviteNewMember,
    ]
  )

  return (
    <OrganizationsContext.Provider value={value} {...props}>
      <Outlet />
    </OrganizationsContext.Provider>
  )
}

export const useOrganizationsProvider = () => {
  const {
    listOrganizations,
    currentOrganization,
    updateOrganization,
    deleteOrganization,
    inviteNewMember,
  } = useContext(OrganizationsContext)
  return {
    listOrganizations,
    currentOrganization,
    updateOrganization,
    deleteOrganization,
    inviteNewMember,
  }
}
