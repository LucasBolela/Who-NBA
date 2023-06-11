import { request } from "."
import {
  IInviteNewMember,
  IUpdateOrganization,
} from "../validation/organization"

export class OrganizationRequest {
  static async listOrganizations(name?: string) {
    return request({
      url: `/api/auth/organizations/list?name=${name}`,
      method: "GET",
    })
  }

  static async inviteNewMember({ email }: IInviteNewMember) {
    return request({
      url: "/api/auth/organizations/invite/",
      method: "POST",
      data: {
        email,
      },
    })
  }

  static async updateOrganization({ new_name }: IUpdateOrganization) {
    return request({
      url: "/api/auth/organizations/update/name/",
      method: "PATCH",
      data: {
        new_name,
      },
    })
  }

  static async deleteOrganization() {
    return request({
      url: "/api/auth/organizations/delete/",
      method: "DELETE",
    })
  }
}
