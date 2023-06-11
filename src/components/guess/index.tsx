import { Flex, Grid, Image, Text } from "@mantine/core"

interface PlayerProps {
  name: string
  nation: string
  team: string
  position: string
  age: number
  jersey: number
}
export const GuessComponent = ({
  name,
  nation,
  team,
  position,
  age,
  jersey,
}: PlayerProps) => {
  return (
    <Flex m={"50px 0 15px"} gap="md" direction="column">
      <Text component="h2" variant="text" fz={28} fw="bold">
        {name}
      </Text>
      <Grid justify="center">
        <Grid.Col
          className="mx-1 sm:mx-1 overflow-hidden w-full max-w-[60px] shadowed font-bold text-lg sm:text-xl flex aspect-square rounded-full justify-center items-center text-white bg-slate-400"
          span={2}
        >
          <Image className="drop-shadow rounded-full" src={nation} />
        </Grid.Col>
        <Grid.Col
          className="mx-1 sm:mx-1 overflow-hidden w-full max-w-[60px] shadowed font-bold text-lg sm:text-xl flex aspect-square rounded-full justify-center items-center text-white bg-slate-400"
          span={2}
        >
          <Image className="drop-shadow rounded-full" src={team} />
        </Grid.Col>
        <Grid.Col
          className="mx-1 sm:mx-1 overflow-hidden w-full max-w-[60px] shadowed font-bold text-lg sm:text-xl flex aspect-square rounded-full justify-center items-center text-white bg-slate-400"
          span={2}
        >
          {position}
        </Grid.Col>
        <Grid.Col
          className="mx-1 sm:mx-1 overflow-hidden w-full max-w-[60px] shadowed font-bold text-lg sm:text-xl flex aspect-square rounded-full justify-center items-center text-white bg-slate-400"
          span={2}
        >
          {age}
        </Grid.Col>
        <Grid.Col
          className="mx-1 sm:mx-1 overflow-hidden w-full max-w-[60px] shadowed font-bold text-lg sm:text-xl flex aspect-square rounded-full justify-center items-center text-white bg-slate-400"
          span={2}
        >
          {jersey}
        </Grid.Col>
      </Grid>
    </Flex>
  )
}
