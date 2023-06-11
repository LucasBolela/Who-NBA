import { z } from "zod"

export const updateOrganizationSchema = z.object({
  new_name: z.string().min(1).optional(),
})

export const deleteOrganizationSchema = z.object({
  organization_name: z.string().min(1),
})

export const inviteNewMemberSchema = z.object({
  email: z.string().email(),
})

export type IUpdateOrganization = z.infer<typeof updateOrganizationSchema>
export type IDeleteOrganization = z.infer<typeof deleteOrganizationSchema>
export type IInviteNewMember = z.infer<typeof inviteNewMemberSchema>
