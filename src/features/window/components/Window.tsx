import { MouseEvent, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '../store/windowsStore.ts';
import { Window as WindowType } from '@/types';

interface WindowProps {
  window: WindowType;
}

export const Window = ({ window }: WindowProps) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 500, height: 300 });
  const windowRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  const { closeWindow, minimizeWindow, setFocusedWindow, focusedWindow } = useWindowStore();

  const handleDrag = (event: globalThis.MouseEvent) => {
    if (!isResizing.current) {
      setPosition((prev) => ({
        x: prev.x + event.movementX,
        y: prev.y + event.movementY,
      }));
    }
  };

  const handleResize = (event: MouseEvent) => {
    setSize((prev) => ({
      width: Math.max(300, prev.width + event.movementX),
      height: Math.max(200, prev.height + event.movementY),
    }));
  };

  return (
    <motion.div
      ref={windowRef}
      className="absolute bg-gray-100 border border-gray-300 shadow-lg rounded-lg overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: focusedWindow === window.id ? 10 : 5,
      }}
      onMouseDown={() => setFocusedWindow(window)}
      onMouseMove={(event) => isResizing.current && handleResize(event)}
    >
      {/* Window Header (Mac OS X Lion Style) */}
      <div
        className="flex items-center justify-between px-3 py-2 bg-gradient-to-b from-gray-200 to-gray-300 border-b border-gray-400 rounded-t-lg select-none cursor-move"
        onMouseDown={(event) => {
          event.preventDefault();
          document.addEventListener('mousemove', handleDrag);
          document.addEventListener(
            'mouseup',
            () => document.removeEventListener('mousemove', handleDrag),
            { once: true },
          );
        }}
      >
        <div className="flex gap-2">
          <button
            className="w-3 h-3 bg-red-500 rounded-full border border-red-700"
            onClick={() => closeWindow(window)}
          />
          <button
            className="w-3 h-3 bg-yellow-500 rounded-full border border-yellow-700"
            onClick={() => minimizeWindow(window)}
          />
          <button className="w-3 h-3 bg-green-500 rounded-full border border-green-700" />
        </div>

        <span className="text-sm text-gray-700 font-semibold">{window.title}</span>

        <div className="w-10"></div>
      </div>

      <div className="p-4 text-gray-700">
        <p>📂 This is a Mac OS X Lion-style window.</p>
        <p>Try dragging or resizing it!</p>
        <p>Minimized : {window.minimized ? 'Yes' : 'No'} </p>
      </div>

      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={(event) => {
          event.preventDefault();
          isResizing.current = true;
          document.addEventListener('mouseup', () => (isResizing.current = false), { once: true });
        }}
      />
    </motion.div>
  );
};
