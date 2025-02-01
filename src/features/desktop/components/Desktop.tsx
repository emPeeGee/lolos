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
  const [selectedIcons, setSelectedIcons] = useState<number[]>([]);

  const handleIconClick = (event: React.MouseEvent, id: number | null) => {
    if (!id) {
      if (!event.shiftKey) {
        setSelectedIcons([]);
      }
      return;
    }

    if (event.shiftKey) {
      setSelectedIcons((icons) => (icons.includes(id) ? icons : [...icons, id]));
    } else {
      setSelectedIcons([id]);
    }
  };

  return (
    <div
      className="h-screen w-screen flex flex-col items-center bg-[url(assets/images/wallpaper.png)] bg-cover bg-center"
      onClick={(event) => handleIconClick(event, null)}
    >
      <div className="grid grid-cols-8 gap-4">
        {folderIcons.map((icon) => (
          <FolderIcon
            onClick={(event) => handleIconClick(event, icon.id)}
            key={icon.id}
            name={icon.name}
            isSelected={selectedIcons.includes(icon.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Desktop;
