import { Icon } from './Icon';
import { Icon as IconType } from '@/types';

interface FileIconProps {
  icon: IconType;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDoubleClick?: () => void;
}

export function FileIcon({ icon, isSelected, onClick, onDoubleClick }: FileIconProps) {
  return (
    <Icon
      icon={icon}
      isSelected={isSelected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      src="src/assets/mimetypes/unknown.png"
    />
  );
}
