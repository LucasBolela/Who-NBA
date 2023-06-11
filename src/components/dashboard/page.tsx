import { Box, Image, Title } from "@mantine/core"
import { PropsWithChildren } from "react"
import NBALogo from "../../assets/images/nba-logo.png"

interface PageProps extends PropsWithChildren {
  title: string
}

export const Page = ({ title, children }: PageProps) => {
  return (
    <section className="px-12 my-12 w-full flex justify-center">
      <Box className="max-w-6xl w-full text-center justify-center items-center">
        <Image className="m-auto mb-4" src={NBALogo} width={100} />
        <Title mb={24}>{title}</Title>
        {children}
      </Box>
    </section>
  )
}
