import { Icon } from '@/types';
import { atom } from 'jotai';

export const desktopIconsAtom = atom<Icon[]>([
  { id: 1, name: 'Folder 1', type: 'folder' },
  { id: 2, name: 'File 1', type: 'file' },
  { id: 3, name: 'Folder 2', type: 'folder' },
  { id: 4, name: 'File 2', type: 'file' },
]);

export const selectedIconsAtom = atom<number[]>([]);
