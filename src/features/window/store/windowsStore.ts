import { create } from 'zustand';

interface Window {
  id: number;
  title: string;
  minimized: boolean;
}

interface WindowStore {
  windows: Window[];
  focusedWindow: number | null;
  windowCounter: number;

  addWindow: () => void;
  closeWindow: (window: Window) => void;
  minimizeWindow: (window: Window) => void;
  restoreWindow: (window: Window) => void;
  setFocusedWindow: (window: Window) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  focusedWindow: null,
  windowCounter: 1,

  addWindow: () =>
    set((state) => {
      const newWindow: Window = {
        id: state.windowCounter,
        title: `Window ${state.windowCounter}`,
        minimized: false,
      };

      return {
        windows: [...state.windows, newWindow],
        focusedWindow: newWindow.id,
        windowCounter: state.windowCounter + 1,
      };
    }),

  closeWindow: ({ id }) =>
    set((state) => ({
      windows: state.windows.filter((win) => win.id !== id),
      focusedWindow: state.focusedWindow === id ? null : state.focusedWindow,
    })),

  minimizeWindow: ({ id }) =>
    set((state) => ({
      windows: state.windows.map((win) => (win.id === id ? { ...win, minimized: true } : win)),
    })),

  restoreWindow: ({ id }) =>
    set((state) => ({
      windows: state.windows.map((win) => (win.id === id ? { ...win, minimized: false } : win)),
      focusedWindow: id,
    })),

  setFocusedWindow: ({ id }) => set({ focusedWindow: id }),
}));
