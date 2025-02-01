import { FolderIcon } from './FolderIcon';
import { FileIcon } from './FileIcon';
import { Icon } from '@/types';

const iconComponents = {
  folder: FolderIcon,
  file: FileIcon,
};

interface IconFactoryProps {
  icon: Icon;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDoubleClick?: () => void;
}

export function IconFactory({ icon, isSelected, onClick, onDoubleClick }: IconFactoryProps) {
  const IconComponent = iconComponents[icon.type];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      icon={icon}
      isSelected={isSelected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    />
  );
}
