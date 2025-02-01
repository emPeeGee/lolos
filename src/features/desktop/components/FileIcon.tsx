interface FileIconProps {
  name: string;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDoubleClick?: () => void;
}

export function FileIcon({ name, isSelected, onClick, onDoubleClick }: FileIconProps) {
  return (
    <div
      className={`flex flex-col items-center`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      onDoubleClick={onDoubleClick}
    >
      <img
        src="src/assets/mimetypes/unknown.png"
        alt={name}
        className={`h-16 mb-1 bg-contain bg-center ${isSelected ? 'bg-blue-500' : ''}`}
      />
      <div className={`w-fit text-center text-white ${isSelected ? 'bg-blue-500' : ''}`}>
        <span>{name}</span>
      </div>
    </div>
  );
}
