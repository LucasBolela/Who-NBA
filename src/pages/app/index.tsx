import { useState } from "react"
import { PlayerCard } from "../../components/card"
import { Page } from "../../components/dashboard/page"
import { playersAllInfo } from "../../json/players"
import { Box } from "@mantine/core"
import { GuessComponent } from "../../components/guess"
import { IndicatorsComponent } from "../../components/indicators"

interface PlayersProps {
  id: string
  name: string
  image: string
  position: string
  age: number
  jersey: number
  team: string
  nation: string
}

export const BasePage = () => {
  const [value, setValue] = useState([])
  const [guesses, setGuesses] = useState<PlayersProps[]>([])
  const onGuess = (val: string) => {
    setGuesses((prev) => [
      ...prev,
      playersAllInfo.find((player) => player.id == val),
    ])
  }
  return (
    <Page title="Who is the NBA?">
      <PlayerCard value={value} guess={guesses.length + 1} onGuess={onGuess} />
      <Box mt={40} maw={500} w={"100%"}>
        {guesses.length ? (
          <>
            {guesses
              .map((guess, i) => (
                <GuessComponent
                  name={guess?.name || ""}
                  nation={guess?.nation || ""}
                  team={guess?.team || ""}
                  position={guess?.position || ""}
                  age={guess?.age || 0}
                  jersey={guess?.jersey || 0}
                  key={i}
                />
              ))
              .reverse()}
            <IndicatorsComponent />
          </>
        ) : (
          ""
        )}
      </Box>
    </Page>
  )
}
