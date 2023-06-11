import { pureRequest, request } from "."
import { ILogin, IRegister, IValidateEmail } from "../validation/auth"

export class AuthRequest {
  static login({ email, password }: ILogin) {
    return request({
      url: "/api/auth/signin/",
      method: "POST",
      data: { email, password },
    })
  }

  static refreshToken(refresh_token: string) {
    return pureRequest({
      url: "/api/auth/refresh/",
      method: "GET",
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    })
  }

  static register({ email, password, name, phone, cpf_cnpj }: IRegister) {
    return request({
      url: "/api/auth/user/create/",
      method: "POST",
      data: {
        email,
        password,
        name,
        phone,
        cpf_cnpj,
      },
    })
  }

  static superRegister({ email, password, name, phone, cpf_cnpj }: IRegister) {
    return request({
      url: "/api/auth/staff/user/create/",
      method: "POST",
      data: {
        email,
        password,
        name,
        phone,
        cpf_cnpj,
      },
    })
  }

  static logout() {
    return request({
      url: "/api/auth/logout/",
      method: "GET",
    })
  }

  static validateEmail({ validation_number }: IValidateEmail) {
    return request({
      url: "/api/auth/user/validate/email/",
      method: "POST",
      data: { validation_number },
    })
  }

  static resendEmail(email: string) {
    return request({
      url: "/api/auth/user/re-send/email/",
      method: "POST",
      data: { email },
    })
  }
}
