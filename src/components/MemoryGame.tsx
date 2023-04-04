import { useEffect, useState } from "react";
import MemoCard from "./MemoryCard";

interface Card {
  position: number;
  name: string;
  emoji: string;
  isRevealed: boolean;
  isMatched: boolean;
}

interface Props {
  cards: Card[];
}

interface Player {
  name: string;
  playing: boolean;
  turnsWon: number;
  gameWon: boolean;
}

const MemoryGame = ({ cards }: Props) => {
  /* TODO: Add Game Settings for Deck length and Player Data via Inputs to App */
  const initPlayers = [
    { name: "1", playing: true, turnsWon: 0, gameWon: false },
    { name: "2", playing: false, turnsWon: 0, gameWon: false },
  ];

  const [players, setPlayers] = useState<Player[]>(initPlayers);
  const [memoryDeck, setMemoryDeck] = useState(cards);
  const [cardToMatch, setCardToMatch] = useState("");
  const [cardsTurned, setCardsTurned] = useState(0);
  const [isProcessingTurn, setIsProcessingTurn] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const restartGame = () => {
    shuffleAndResetBoard();
    setPlayers(initPlayers);
    setIsGameOver(false);
  };

  useEffect(() => {
    shuffleAndResetBoard();
  }, []);

  useEffect(() => {
    checkForGameOver();
  }, memoryDeck);

  const shuffleAndResetBoard = () => {
    setMemoryDeck(
      memoryDeck
        .map((card: Card) => ({
          ...card,
          position: Math.floor(Math.random() * 100_000),
          isRevealed: false,
          isMatched: false,
        }))
        .sort((a, b) => a.position - b.position)
    );
  };

  const revealCard = (position: number) => {
    setMemoryDeck(
      memoryDeck.map((card: Card) =>
        card.position === position ? { ...card, isRevealed: true } : card
      )
    );
  };

  const markCardsAsMatched = (name: string) => {
    setMemoryDeck(
      memoryDeck.map((card: Card) =>
        card.name === name ? { ...card, isMatched: true } : card
      )
    );
  };

  const hideCards = () => {
    setMemoryDeck(
      memoryDeck.map((card: Card) =>
        !card.isMatched ? { ...card, isRevealed: false } : card
      )
    );
  };

  const checkForGameOver = () => {
    if (memoryDeck.every((card) => card.isMatched === true)) {
      setIsGameOver(true);
      const winner = players.reduce((prev, current) =>
        prev.turnsWon > current.turnsWon ? prev : current
      );
      setPlayers(
        players.map((player) =>
          player.name === winner.name ? { ...player, gameWon: true } : player
        )
      );
    }
  };

  const handleTurn = (name: string) => {
    if (cardsTurned < 1) {
      setCardToMatch(name);
      setCardsTurned(1);
    } else {
      setIsProcessingTurn(true);
      if (cardToMatch === name) {
        setPlayers(
          players.map((player) =>
            player.playing
              ? { ...player, turnsWon: player.turnsWon + 1 }
              : player
          )
        );
        markCardsAsMatched(name);
        setIsProcessingTurn(false);
      } else {
        setPlayers(
          players.map((player) =>
            player.playing
              ? { ...player, playing: false }
              : { ...player, playing: true }
          )
        );
        setTimeout(() => {
          hideCards();
          setIsProcessingTurn(false);
        }, 1300);
      }
      setCardsTurned(0);
    }
  };

  return (
    <div className="memory-board">
      <div
        className={isProcessingTurn ? "memory-deck processing" : "memory-deck"}
      >
        {memoryDeck.map((card) => (
          <MemoCard
            revealCard={revealCard}
            handleTurn={handleTurn}
            key={card.position}
            memoCard={card}
          />
        ))}
      </div>
      <div className="game-status">
        <div className="status-text-wrapper">
          <h1>Memory Game</h1>
          <p className="status-text-game">
            {isGameOver ? "Game Over" : "Game is running, have fun!"}
          </p>
          {isGameOver && (
            <p className="status-text-winner">
              {players.every((player) => player.gameWon === true)
                ? "It's a Draw!"
                : "Player " +
                  players.find((player) => player.gameWon === true)?.name +
                  " won!"}
            </p>
          )}
          {isGameOver && (
            <button className="newgame" onClick={restartGame}>
              Start New Game
            </button>
          )}
        </div>
        <div className="players">
          {players.map((player) => (
            <div key={player.name} className="player">
              {!isGameOver && player.playing && (
                <p className="player-turn">Your turn!</p>
              )}
              <p className="player-name">Player {player.name}</p>
              <p className="player-points">Turns won: {player.turnsWon}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
