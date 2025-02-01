import { Icon } from './Icon';

interface FolderIconProps {
  name: string;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDoubleClick?: () => void;
}

export function FolderIcon({ name, isSelected, onClick, onDoubleClick }: FolderIconProps) {
  return (
    <Icon
      name={name}
      isSelected={isSelected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      src="src/assets/images/folder.png"
    />
  );
}
