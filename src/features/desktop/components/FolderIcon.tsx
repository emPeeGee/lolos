interface FolderIconProps {
  name: string;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDoubleClick?: () => void;
}

export function FolderIcon({ name, isSelected, onClick, onDoubleClick }: FolderIconProps) {
  return (
    <div
      className={`flex flex-col items-center `}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      onDoubleClick={onDoubleClick}
    >
      <img
        src="src/assets/images/folder.png"
        alt={name}
        className={`h-16 mb-1 bg-cover bg-center ${isSelected ? 'bg-blue-500' : ''}`}
      />
      <div className={`w-fit text-center text-white ${isSelected ? 'bg-blue-500' : ''}`}>
        <span>{name}</span>
      </div>
    </div>
  );
}
