interface MarqueeSelectionProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export function MarqueeSelection({ startX, startY, endX, endY }: MarqueeSelectionProps) {
  const left = Math.min(startX, endX);
  const top = Math.min(startY, endY);
  const width = Math.abs(startX - endX);
  const height = Math.abs(startY - endY);

  const style = {
    left,
    top,
    width,
    height,
  };

  return <div className="absolute border-1 border-black bg-black/10 select-none" style={style} />;
}
