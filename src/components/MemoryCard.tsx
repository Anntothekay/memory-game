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

const MemoryCard = ({ memoCard, revealCard, handleTurn }: Props) => {
  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement | any;
    revealCard(parseInt(target?.id));
    handleTurn(target?.dataset.name);
  };

  return (
    <div
      id={memoCard.position.toString()}
      onClick={handleClick}
      className={
        memoCard.name +
        " card " +
        (memoCard.isRevealed || memoCard.isMatched ? "processing" : "")
      }
      data-name={memoCard.name}
    >
      {memoCard.isRevealed || memoCard.isMatched ? memoCard.emoji : ""}
    </div>
  );
};

export default MemoryCard;
