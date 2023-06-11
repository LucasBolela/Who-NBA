export function countOccurrences(
  array: string[],
  search: string,
  limitIndex = array.length - 1
) {
  return array
    .slice(0, limitIndex + 1)
    .reduce(
      (accumulator, value) =>
        value === search ? accumulator + 1 : accumulator,
      0
    )
}
