import React, { useState } from "react";
import MemoCard from "./MemoCard";

interface Card {
  position: number;
  name: string;
  emoji: string;
  isRevealed: boolean;
  isMatched: boolean;
}

interface Props {
  cards: Card[];
  revealCard: (position: number) => void;
}
const MemoryBoard = ({ cards, revealCard }: Props) => {
  const [players, setPlayer] = useState([
    { name: 1, playing: true, turnsWon: 0 },
    { name: 2, playing: false, turnsWon: 0 },
  ]);
  const [cardToMatch, setCardToMatch] = useState("");
  const [cardsTurned, setCardsTurned] = useState(0);

  const handleTurn = (name: string) => {
    if (cardsTurned < 1) {
      setCardToMatch(name);
      setCardsTurned(1);
    } else {
      if (cardToMatch === name) {
        setPlayer(
          players.map((player) =>
            player.playing
              ? { ...player, turnsWon: player.turnsWon + 1 }
              : player
          )
        );
      } else {
        setPlayer(
          players.map((player) =>
            player.playing
              ? { ...player, playing: false }
              : { ...player, playing: true }
          )
        );
      }
      setCardsTurned(0);
    }
  };

  //   if (cardsTurned < 2) {
  //     setCardsTurned(cardsTurned + 1);
  //   } else {
  //     setCardsTurned(0);
  //   }

  return (
    <>
      <p className="player">Player {players[0].name}</p>
      <div className="memory-board">
        {cards.map((card) => (
          <MemoCard
            revealCard={revealCard}
            handleTurn={handleTurn}
            key={card.position}
            memoCard={card}
          />
        ))}
      </div>
    </>
  );
};

export default MemoryBoard;
