import { useState } from 'react';
import { FolderIcon } from './FolderIcon';

const folderIcons = [
  { id: 1, name: 'Icon 1' },
  { id: 2, name: 'Icon 2' },
  { id: 3, name: 'Icon 3' },
  { id: 4, name: 'Icon 4' },
  { id: 5, name: 'Icon 5' },
  { id: 6, name: 'Icon 6' },
  { id: 7, name: 'Icon 7' },
  { id: 8, name: 'Icon 8' },
];

function Desktop() {
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);

  const handleIconClick = (id: number | null) => {
    setSelectedIcon(id);
  };

  return (
    <div
      className="h-screen w-screen flex flex-col items-center bg-[url(assets/images/wallpaper.png)] bg-cover bg-center"
      onClick={() => handleIconClick(null)}
    >
      <div className="grid grid-cols-8 gap-4">
        {folderIcons.map((icon) => (
          <FolderIcon
            key={icon.id}
            name={icon.name}
            isSelected={selectedIcon === icon.id}
            onClick={() => handleIconClick(icon.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Desktop;
