import { Card, Image, MultiSelect } from "@mantine/core"
import { useState } from "react"
import { players as playersData } from "../../json/players"

interface CardProps {
  value: string[]
  guess: number
  onGuess: any
}
export const PlayerCard = ({ value, guess, onGuess }: CardProps) => {
  const [players, setPlayers] = useState(playersData)
  return (
    <Card
      className="overflow-visible"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      maw={500}
      hidden={false}
    >
      <Card.Section>
        <Image
          src="https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png"
          height={160}
          fit="contain"
          className="p-6"
          alt="NBA Player"
        />
      </Card.Section>

      <MultiSelect
        disabled={guess == 7}
        className="m-auto"
        width={"100%"}
        maw={400}
        p={{ base: "25px 0", md: "25px 50px" }}
        placeholder={`Guess ${guess} of 6`}
        searchable
        value={value}
        onChange={onGuess}
        nothingFound="No players found..."
        data={players}
        multiple={false}
        maxSelectedValues={1}
        maxDropdownHeight={200}
        dropdownPosition="bottom"
      />
    </Card>
  )
}
