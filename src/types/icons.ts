export type IconType = 'folder' | 'file';

export type Icon = {
  id: number;
  name: string;
  type: IconType;
  position: { x: number; y: number };
};
