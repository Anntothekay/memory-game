interface Props {
  memoCard: {
    position: number;
    name: string;
    emoji: string;
    isRevealed: boolean;
    isMatched: boolean;
  };
  revealCard: (position: number) => void;
  handleTurn: (name: string) => void;
}

const MemoCard = ({ memoCard, revealCard, handleTurn }: Props) => {
  const handleClick = (event: any) => {
    revealCard(event.target?.id);
    handleTurn(event.target.dataset.name);
  };

  return (
    <div
      id={memoCard.position.toString()}
      onClick={handleClick}
      className="card"
      data-name={memoCard.name}
    >
      {memoCard.isRevealed ? memoCard.emoji : ""}
    </div>
  );
};

export default MemoCard;
