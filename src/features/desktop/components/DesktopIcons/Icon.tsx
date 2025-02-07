import { Icon as IconType } from '@/types';

type IconProps = {
  icon: IconType;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDoubleClick?: () => void;
  src: string;
};

export function Icon({ icon: { id, name }, isSelected, onClick, onDoubleClick, src }: IconProps) {
  return (
    <div
      id={`icon-${id}`}
      className={`flex flex-col items-center gap-1`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      onDoubleClick={onDoubleClick}
      draggable
    >
      <img
        src={src}
        alt={name}
        className={`h-16 bg-contain bg-center ${isSelected ? 'bg-blue-500' : ''}`}
        draggable={false}
      />
      <div
        className={`w-fit text-center text-white ${isSelected ? 'bg-blue-500' : ''} select-none`}
      >
        <span>{name}</span>
      </div>
    </div>
  );
}
