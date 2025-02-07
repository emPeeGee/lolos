import { MouseEvent, DragEvent, useRef, useState } from 'react';
import { useDesktopStore } from '../../store/desktopStore';
import { IconFactory } from './IconFactory';
import { MarqueeSelection } from '../MarqueeSelection';
import { UI_CONFIG } from '@/config';
import { Icon } from '@/types';

export function DesktopIcons() {
  const {
    desktopIcons,
    selectedIcons,
    setSelectedIcons,
    addSelectedIcon,
    clearSelectedIcons,
    selectIconsInRectangle,
    updateDesktopIconCoords,
  } = useDesktopStore();
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });
  const draggedIconOffsetRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    setIsSelecting(true);
    setSelectionStart({ x: event.clientX, y: event.clientY - UI_CONFIG.MENU_BAR_HEIGHT });
    setSelectionEnd({ x: event.clientX, y: event.clientY - UI_CONFIG.MENU_BAR_HEIGHT });

    if (!event.shiftKey) {
      clearSelectedIcons();
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isSelecting) {
      event.preventDefault();
      setSelectionEnd({ x: event.clientX, y: event.clientY - UI_CONFIG.MENU_BAR_HEIGHT });
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    selectIconsInRectangle(selectionStart.x, selectionStart.y, selectionEnd.x, selectionEnd.y);
  };

  const handleIconClick = (event: MouseEvent, id: number | null) => {
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

  const handleIconDragEnter = (e: DragEvent<HTMLDivElement>, icon: Icon) => {
    if (!draggedIconOffsetRef.current) {
      draggedIconOffsetRef.current = {
        x: e.clientX - icon.position.x,
        y: e.clientY - icon.position.y,
      };
    }
  };

  const handleIconDragEnd = (e: DragEvent<HTMLDivElement>, icon: Icon) => {
    const newX = e.clientX - (draggedIconOffsetRef.current?.x ?? 0);
    const newY = e.clientY - (draggedIconOffsetRef.current?.y ?? 0);
    updateDesktopIconCoords(icon, { x: newX, y: newY });
    draggedIconOffsetRef.current = null;
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
            onDragEnter={(e) => handleIconDragEnter(e, icon)}
            onDragEnd={(e) => handleIconDragEnd(e, icon)}
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
