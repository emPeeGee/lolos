import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Icon } from '@/types';

interface DesktopState {
  desktopIcons: Icon[];
  selectedIcons: number[];
  // TODO: check the usage
  setDesktopIcons: (icons: Icon[]) => void;
  setSelectedIcons: (icons: number[]) => void;
  addSelectedIcon: (id: number) => void;
  removeSelectedIcon: (id: number) => void;
  clearSelectedIcons: () => void;
  selectIconsInRectangle: (startX: number, startY: number, endX: number, endY: number) => void;
}

export const useDesktopStore = create<DesktopState>()(
  devtools(
    (set, get) => ({
      desktopIcons: [
        { id: 1, name: 'Folder 1', type: 'folder', position: { x: 0, y: 0 } },
        { id: 2, name: 'File 1', type: 'file', position: { x: 100, y: 0 } },
        { id: 3, name: 'Folder 2', type: 'folder', position: { x: 200, y: 0 } },
        { id: 4, name: 'File 2', type: 'file', position: { x: 300, y: 0 } },
      ],
      selectedIcons: [],
      setDesktopIcons: (icons) => set({ desktopIcons: icons }, undefined, 'setDesktopIcons'),
      setSelectedIcons: (icons) => set({ selectedIcons: icons }, undefined, 'setSelectedIcons'),
      addSelectedIcon: (id) =>
        set(
          (state) => ({ selectedIcons: [...state.selectedIcons, id] }),
          undefined,
          'addSelectedIcon',
        ),
      removeSelectedIcon: (id) =>
        set(
          (state) => ({ selectedIcons: state.selectedIcons.filter((iconId) => iconId !== id) }),
          undefined,
          'removeSelectedIcon',
        ),
      clearSelectedIcons: () => set({ selectedIcons: [] }, undefined, 'clearSelectedIcons'),
      selectIconsInRectangle: (startX, startY, endX, endY) => {
        const { desktopIcons } = get();
        const selectedIcons = desktopIcons
          .filter((icon) => {
            const { x, y } = icon.position;
            const iconWidth = 100;
            const iconHeight = 100;
            return (
              x + iconWidth >= Math.min(startX, endX) &&
              x <= Math.max(startX, endX) &&
              y + iconHeight >= Math.min(startY, endY) &&
              y <= Math.max(startY, endY)
            );
          })
          .map((icon) => icon.id);
        set({ selectedIcons }, undefined, 'selectIconsInRectangle');
      },
    }),
    { name: 'DesktopStore', store: 'DesktopStore' },
  ),
);
