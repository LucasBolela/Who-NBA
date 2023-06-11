import { Grid, Text } from "@mantine/core"

export const IndicatorsComponent = () => {
  return (
    <Grid justify="center" className="flex-nowrap">
      <Grid.Col
        className="max-w-[60px] mx-1 sm:mx-1 text-xs min-[360px]:text-[16px]"
        span={2}
      >
        <Text tt="uppercase" fw="bold">
          Nat
        </Text>
      </Grid.Col>
      <Grid.Col
        className="max-w-[60px] mx-1 sm:mx-1 text-xs min-[360px]:text-[16px]"
        span={2}
      >
        <Text tt="uppercase" fw="bold">
          Team
        </Text>
      </Grid.Col>
      <Grid.Col
        className="max-w-[60px] mx-1 sm:mx-1 text-xs min-[360px]:text-[16px]"
        span={2}
      >
        <Text tt="uppercase" fw="bold">
          Pos
        </Text>
      </Grid.Col>
      <Grid.Col
        className="max-w-[60px] mx-1 sm:mx-1 text-xs min-[360px]:text-[16px]"
        span={2}
      >
        <Text tt="uppercase" fw="bold">
          Age
        </Text>
      </Grid.Col>
      <Grid.Col
        className="max-w-[60px] mx-1 sm:mx-1 text-xs min-[360px]:text-[16px] flex justify-center"
        span={2}
      >
        <Text tt="uppercase" fw="bold">
          Jersey
        </Text>
      </Grid.Col>
    </Grid>
  )
}
