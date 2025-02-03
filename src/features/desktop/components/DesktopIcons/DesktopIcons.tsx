import { useState } from 'react';
import { useDesktopStore } from '../../store/desktopStore';
import { IconFactory } from './IconFactory';
import { MarqueeSelection } from '../MarqueeSelection';

export function DesktopIcons() {
  const {
    desktopIcons,
    selectedIcons,
    setSelectedIcons,
    addSelectedIcon,
    clearSelectedIcons,
    selectIconsInRectangle,
  } = useDesktopStore();
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });

  // TODO: move into constants and use in menubar
  const menuBarHeight = 48;

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsSelecting(true);
    setSelectionStart({ x: event.clientX, y: event.clientY - menuBarHeight });
    setSelectionEnd({ x: event.clientX, y: event.clientY - menuBarHeight });

    if (!event.shiftKey) {
      clearSelectedIcons();
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isSelecting) {
      event.preventDefault();
      setSelectionEnd({ x: event.clientX, y: event.clientY - menuBarHeight });
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    selectIconsInRectangle(selectionStart.x, selectionStart.y, selectionEnd.x, selectionEnd.y);
  };

  const handleIconClick = (event: React.MouseEvent, id: number | null) => {
    event.stopPropagation();
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
      className="w-screen h-full relative select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="relative" onMouseDown={(event) => handleIconClick(event, null)}>
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            style={{ position: 'absolute', left: icon.position.x, top: icon.position.y }}
          >
            <IconFactory
              icon={icon}
              isSelected={selectedIcons.includes(icon.id)}
              onClick={(event) => handleIconClick(event, icon.id)}
            />
          </div>
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
