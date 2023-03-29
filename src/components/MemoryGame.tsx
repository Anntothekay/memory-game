import { useState } from "react";
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
  hideCards: () => void;
  markCardsAsMatched: (name: string) => void;
}
const MemoryGame = ({
  cards,
  revealCard,
  hideCards,
  markCardsAsMatched,
}: Props) => {
  const [players, setPlayer] = useState([
    { name: 1, playing: true, turnsWon: 0 },
    { name: 2, playing: false, turnsWon: 0 },
  ]);
  const [cardToMatch, setCardToMatch] = useState("");
  const [cardsTurned, setCardsTurned] = useState(0);
  const [isProcessingTurn, setIsProcessingTurn] = useState(false);

  const handleTurn = (name: string) => {
    if (cardsTurned < 1) {
      setCardToMatch(name);
      setCardsTurned(1);
    } else {
      setIsProcessingTurn(true);
      if (cardToMatch === name) {
        setPlayer(
          players.map((player) =>
            player.playing
              ? { ...player, turnsWon: player.turnsWon + 1 }
              : player
          )
        );
        markCardsAsMatched(name);
        setIsProcessingTurn(false);
      } else {
        setPlayer(
          players.map((player) =>
            player.playing
              ? { ...player, playing: false }
              : { ...player, playing: true }
          )
        );
        setTimeout(() => {
          hideCards();
        }, 2000);
        setTimeout(() => {
          setIsProcessingTurn(false);
        }, 2000);
      }
      setCardsTurned(0);
    }
  };

  return (
    <>
      <div className="players">
        {players.map((player) => (
          <div key={player.name} className="player">
            {player.playing && <p>Your turn!</p>}
            <p>Player {player.name}</p>
            <p>Turns won: {player.turnsWon}</p>
          </div>
        ))}
      </div>
      <div
        className={
          isProcessingTurn ? "memory-board processing" : "memory-board"
        }
      >
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

export default MemoryGame;
