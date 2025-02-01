import { FolderIcon } from './FolderIcon';
import { FileIcon } from './FileIcon';
import { IconType } from '@/types';

const iconComponents = {
  folder: FolderIcon,
  file: FileIcon,
};

interface IconFactoryProps {
  type: IconType;
  name: string;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDoubleClick?: () => void;
}

export function IconFactory({ type, name, isSelected, onClick, onDoubleClick }: IconFactoryProps) {
  const IconComponent = iconComponents[type];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      name={name}
      isSelected={isSelected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    />
  );
}
