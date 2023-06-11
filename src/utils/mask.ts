import { countOccurrences } from "./array"
import { extractNumbers } from "./string"

export function maskNumber(value: string, mask: string, placeholder?: string) {
  const newValue = extractNumbers(String(value))

  return Array.from(mask)
    .map((char, index, array) =>
      char !== "#"
        ? char
        : newValue[countOccurrences(array, "#", index) - 1] ?? placeholder
    )
    .join("")
}

export function maskCpf(value = "") {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
}

export function maskCnpj(value = "") {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18)
}

export function maskCpfOrCnpj(value: string) {
  return String(value).length <= 15 ? maskCpf(value) : maskCnpj(value)
}

export function maskPhone(value = "") {
  const cleaned = ("" + value).replace(/\D/g, "")
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3]
  }
  return value
}
