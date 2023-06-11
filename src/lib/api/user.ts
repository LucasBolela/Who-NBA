import { request } from "."
import { IUpdatePassword } from "../validation/user"

export class UserRequest {
  static getInfo() {
    return request({
      url: "/api/user/me/",
      method: "GET",
    })
  }

  static updatePassword({ password, re_password }: IUpdatePassword) {
    return request({
      url: "/api/auth/user/update/password/",
      method: "POST",
      data: {
        password,
        re_password,
      },
    })
  }
}
