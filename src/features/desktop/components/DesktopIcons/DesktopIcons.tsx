import { useState } from 'react';
import { useDesktopStore } from '../../store/desktopStore';
import { IconFactory } from './IconFactory';
import { MarqueeSelection } from '../MarqueeSelection';

export function DesktopIcons() {
  const { desktopIcons, selectedIcons, setSelectedIcons, addSelectedIcon, clearSelectedIcons } =
    useDesktopStore();
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsSelecting(true);
    setSelectionStart({ x: event.clientX, y: event.clientY });
    setSelectionEnd({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isSelecting) {
      setSelectionEnd({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const handleIconClick = (event: React.MouseEvent, id: number | null) => {
    if (!id) {
      if (!event.shiftKey) {
        clearSelectedIcons();
      }
      return;
    }

    if (event.shiftKey) {
      addSelectedIcon(id);
    } else {
      setSelectedIcons([id]);
    }
  };

  return (
    <div
      className="h-screen w-screen relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={(event) => handleIconClick(event, null)}
    >
      <div className="grid grid-cols-8 gap-4">
        {desktopIcons.map((icon) => (
          <IconFactory
            icon={icon}
            key={icon.id}
            isSelected={selectedIcons.includes(icon.id)}
            onClick={(event) => handleIconClick(event, icon.id)}
          />
        ))}
      </div>
      {isSelecting && (
        <MarqueeSelection
          startX={selectionStart.x}
          startY={selectionStart.y}
          endX={selectionEnd.x}
          endY={selectionEnd.y}
        />
      )}
    </div>
  );
}
