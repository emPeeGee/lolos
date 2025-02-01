import { useState } from 'react';
import { FolderIcon } from './FolderIcon';
import { FileIcon } from './FileIcon';

const desktopItems = [
  { id: 1, name: 'Folder 1', type: 'folder' },
  { id: 2, name: 'File 1', type: 'file' },
  { id: 3, name: 'Folder 2', type: 'folder' },
  { id: 4, name: 'File 2', type: 'file' },
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
        {desktopItems.map((item) =>
          item.type === 'folder' ? (
            <FolderIcon
              onClick={(event) => handleIconClick(event, item.id)}
              key={item.id}
              name={item.name}
              isSelected={selectedIcons.includes(item.id)}
            />
          ) : (
            <FileIcon
              onClick={(event) => handleIconClick(event, item.id)}
              key={item.id}
              name={item.name}
              isSelected={selectedIcons.includes(item.id)}
            />
          ),
        )}
      </div>
    </div>
  );
}

export default Desktop;
