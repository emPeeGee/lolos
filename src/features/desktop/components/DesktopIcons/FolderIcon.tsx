import { Icon } from './Icon';
import { Icon as IconType } from '@/types';

interface FolderIconProps {
  icon: IconType;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDoubleClick?: () => void;
}

export function FolderIcon({ icon, isSelected, onClick, onDoubleClick }: FolderIconProps) {
  return (
    <Icon
      icon={icon}
      isSelected={isSelected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      src="src/assets/images/folder.png"
    />
  );
}
