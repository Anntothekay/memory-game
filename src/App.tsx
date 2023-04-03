import { useEffect, useState } from "react";
import MemoryGame from "./components/MemoryGame";

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

  return (
    <>
      <MemoryGame cards={initMemoDeck} />
    </>
  );
}

export default App;
