import { Window } from './Window';
import { useWindowStore } from '../store/windowsStore';

export const WindowManager: React.FC = () => {
  const { windows, addWindow, restoreWindow } = useWindowStore();

  return (
    <div className={`w-screen select-none`}>
      <button
        className="absolute bottom-0 left-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
        onClick={addWindow}
      >
        Open New Window
      </button>

      <div className="absolute bottom-2 left-2 flex gap-2">
        {windows
          .filter((win) => win.minimized)
          .map((win) => (
            <button
              key={win.id}
              className="bg-gray-700 text-white px-4 py-2 rounded-md"
              onClick={() => restoreWindow(win)}
            >
              {win.title}
            </button>
          ))}
      </div>

      {windows.map((win) => (
        <Window key={win.id} window={win} />
      ))}
    </div>
  );
};
