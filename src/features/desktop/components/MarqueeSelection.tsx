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
    position: 'absolute' as unknown as 'absolute',
    border: '1px dashed #000',
    backgroundColor: 'rgba(0, 0, 255, 0.1)', // TODO: color
  };

  return <div style={style} />;
}
