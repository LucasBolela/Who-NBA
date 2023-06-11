/* eslint-disable no-useless-escape */
import { z } from "zod"
import { ERROR_MESSAGES } from "../../config/error"

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/

export const loginSchema = z.object({
  email: z
    .string({ required_error: ERROR_MESSAGES.required_email })
    .email("Digite um e-mail válido"),
  password: z.string({ required_error: "A senha é obrigatória" }),
})

export const registerSchema = z.object({
  name: z.string({
    required_error: "O nome de usuário é obrigatório",
  }),
  email: z
    .string({ required_error: ERROR_MESSAGES.required_email })
    .email("Digite um e-mail válido"),
  password: z
    .string({ required_error: "A senha é obrigatória" })
    .regex(
      new RegExp(".*[A-Z].*"),
      "A senha deve conter no mínimo uma letra maiúscula"
    )
    .regex(
      new RegExp(".*[a-z].*"),
      "A senha deve conter no mínimo uma letra minúscula"
    )
    .regex(new RegExp(".*\\d.*"), "A senha deve conter no mínimo um número")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "A senha deve conter no mínimo um caractere especial"
    )
    .min(6, "A senha deve conter no mínimo 8 caracteres")
    .max(12, "A senha deve conter no máximo 12 caracteres"),
  cpf_cnpj: z
    .string({ required_error: "O CPF ou CNPJ é obrigatório" })
    .regex(
      /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
      { message: "Documento inválido" }
    )
    .transform((value) =>
      value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
    ),
  phone: z
    .string({ required_error: "O telefone é obrigatório" })
    .regex(/^\+55\s\(\d{2}\)\s\d{5}-\d{4}$/, {
      message: "Insira um telefone válido",
    })
    .trim()
    .transform((value) =>
      value
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
        .split(" ")
        .join("")
    ),
})

export const validateEmailSchema = z.object({
  validation_number: z.string({
    invalid_type_error: "",
    required_error: "O código de verificação é obrigatório",
  }),
})

export const emailSchema = z.object({
  email: z
    .string({ required_error: ERROR_MESSAGES.required_email })
    .email("Digite um e-mail válido"),
})

export type ILogin = z.infer<typeof loginSchema>
export type IRegister = z.infer<typeof registerSchema>
export type IEmail = z.infer<typeof emailSchema>
export type IValidateEmail = z.infer<typeof validateEmailSchema>
