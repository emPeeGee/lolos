import { useState } from 'react';
import { Window } from './Window';

interface WindowData {
  id: number;
  title: string;
  minimized: boolean;
}

export const WindowManager: React.FC = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [windowCounter, setWindowCounter] = useState(1);
  const [focusedWindow, setFocusedWindow] = useState<number | null>(null);

  const addWindow = () => {
    const newWindow: WindowData = {
      id: windowCounter,
      title: `Window ${windowCounter}`,
      minimized: false,
    };
    setWindows([...windows, newWindow]);
    setWindowCounter(windowCounter + 1);
    setFocusedWindow(newWindow.id);
  };

  const closeWindow = (id: number) => {
    setWindows(windows.filter((win) => win.id !== id));
    if (focusedWindow === id) setFocusedWindow(null);
  };

  const minimizeWindow = (id: number) => {
    setWindows(windows.map((win) => (win.id === id ? { ...win, minimized: !win.minimized } : win)));
  };

  return (
    <div className={`w-screen select-none`}>
      <button
        className="absolute bottom-0 left-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
        onClick={addWindow}
      >
        Open New Window
      </button>

      {windows.map((win) => (
        <Window
          key={win.id}
          title={win.title}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          minimized={win.minimized}
          onFocus={() => setFocusedWindow(win.id)}
          isFocused={focusedWindow === win.id}
        />
      ))}
    </div>
  );
};
