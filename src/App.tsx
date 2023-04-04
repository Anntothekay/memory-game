import { useEffect, useState } from "react";
import MemoryGame from "./components/MemoryGame";
import { memoryDeck } from "./memoryDeck";

function App() {
  return (
    <>
      <MemoryGame cards={memoryDeck} />
    </>
  );
}

export default App;
