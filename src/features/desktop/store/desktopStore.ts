import { create } from 'zustand';
import { Icon } from '@/types';

interface DesktopState {
  desktopIcons: Icon[];
  selectedIcons: number[];
  setDesktopIcons: (icons: Icon[]) => void;
  setSelectedIcons: (icons: number[]) => void;
  addSelectedIcon: (id: number) => void;
  removeSelectedIcon: (id: number) => void;
  clearSelectedIcons: () => void;
}

export const useDesktopStore = create<DesktopState>((set) => ({
  desktopIcons: [
    { id: 1, name: 'Folder 1', type: 'folder' },
    { id: 2, name: 'File 1', type: 'file' },
    { id: 3, name: 'Folder 2', type: 'folder' },
    { id: 4, name: 'File 2', type: 'file' },
  ],
  selectedIcons: [],
  setDesktopIcons: (icons) => set({ desktopIcons: icons }),
  setSelectedIcons: (icons) => set({ selectedIcons: icons }),
  addSelectedIcon: (id) => set((state) => ({ selectedIcons: [...state.selectedIcons, id] })),
  removeSelectedIcon: (id) =>
    set((state) => ({ selectedIcons: state.selectedIcons.filter((iconId) => iconId !== id) })),
  clearSelectedIcons: () => set({ selectedIcons: [] }),
}));
