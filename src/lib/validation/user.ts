/* eslint-disable no-useless-escape */
import { z } from "zod"

export const updatePasswordSchema = z
  .object({
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
    re_password: z
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
  })
  .superRefine(({ re_password, password }, ctx) => {
    if (re_password !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas devem ser iguais",
      })
    }
  })

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Digite um e-mail válido").optional(),
  cpf_cnpj: z
    .string({ required_error: "O CPF ou CNPJ é obrigatório" })
    .regex(
      /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
      { message: "Documento inválido" }
    )
    .transform((value) =>
      value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
    )
    .optional(),
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
    )
    .optional(),
})

export type IUpdatePassword = z.infer<typeof updatePasswordSchema>
export type IUpdateUser = z.infer<typeof updateUserSchema>
