import { useEffect, useState } from "react";
import MemoryGame from "./components/MemoryBoard";

function App() {
  const initMemoDeck = [
    {
      position: 1,
      name: "cat",
      emoji: "🐈",
      isRevealed: false,
      isMatched: false,
    },
    {
      position: 2,
      name: "cat",
      emoji: "🐈",
      isRevealed: false,
      isMatched: false,
    },
    {
      position: 3,
      name: "dog",
      emoji: "🐕",
      isRevealed: false,
      isMatched: false,
    },
    {
      position: 4,
      name: "dog",
      emoji: "🐕",
      isRevealed: false,
      isMatched: false,
    },
    {
      position: 5,
      name: "fish",
      emoji: "🐟",
      isRevealed: false,
      isMatched: false,
    },
    {
      position: 6,
      name: "fish",
      emoji: "🐟",
      isRevealed: false,
      isMatched: false,
    },
    {
      position: 7,
      name: "monkey",
      emoji: "🐵",
      isRevealed: false,
      isMatched: false,
    },
    {
      position: 8,
      name: "monkey",
      emoji: "🐵",
      isRevealed: false,
      isMatched: false,
    },
    {
      position: 9,
      name: "rabbit",
      emoji: "🐇",
      isRevealed: false,
      isMatched: false,
    },
    {
      position: 10,
      name: "rabbit",
      emoji: "🐇",
      isRevealed: false,
      isMatched: false,
    },
  ];

  const [memoDeck, setMemoDeck] = useState(initMemoDeck);

  useEffect(() => {
    shuffleBoard();
  }, []);

  const shuffleBoard = () => {
    setMemoDeck(
      memoDeck
        .map((card) =>
          card.position
            ? { ...card, position: Math.floor(Math.random() * 100_000) }
            : card
        )
        .sort((a, b) => a.position - b.position)
    );
  };

  return (
    <>
      <MemoryGame
        revealCard={(position) => {
          setMemoDeck(
            memoDeck.map((card) =>
              card.position == position ? { ...card, isRevealed: true } : card
            )
          );
          console.log(position);
        }}
        cards={memoDeck}
      />
    </>
  );
}

export default App;
