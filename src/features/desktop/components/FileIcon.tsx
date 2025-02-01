import { Icon } from './Icon';

interface FileIconProps {
  name: string;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDoubleClick?: () => void;
}

export function FileIcon({ name, isSelected, onClick, onDoubleClick }: FileIconProps) {
  return (
    <Icon
      name={name}
      isSelected={isSelected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      src="src/assets/mimetypes/unknown.png"
    />
  );
}
