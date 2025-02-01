import { useAtom } from 'jotai';
import { desktopIconsAtom, selectedIconsAtom } from '../store/desktopAtoms';
import { IconFactory } from './IconFactory';

function Desktop() {
  const [desktopIcons] = useAtom(desktopIconsAtom);
  const [selectedIcons, setSelectedIcons] = useAtom(selectedIconsAtom);

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
        {desktopIcons.map((item) => (
          <IconFactory
            key={item.id}
            type={item.type}
            name={item.name}
            isSelected={selectedIcons.includes(item.id)}
            onClick={(event) => handleIconClick(event, item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Desktop;
