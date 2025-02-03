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
        { id: 1, name: 'Folder 1', type: 'folder' },
        { id: 2, name: 'File 1', type: 'file' },
        { id: 3, name: 'Folder 2', type: 'folder' },
        { id: 4, name: 'File 2', type: 'file' },
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
            const iconElement = document.getElementById(`icon-${icon.id}`);
            if (!iconElement) return false;
            const rect = iconElement.getBoundingClientRect();
            return (
              rect.left >= Math.min(startX, endX) &&
              rect.right <= Math.max(startX, endX) &&
              rect.top >= Math.min(startY, endY) &&
              rect.bottom <= Math.max(startY, endY)
            );
          })
          .map((icon) => icon.id);
        console.log(selectedIcons);
        set({ selectedIcons }, undefined, 'selectIconsInRectangle');
      },
    }),
    { name: 'DesktopStore', store: 'DesktopStore' },
  ),
);
