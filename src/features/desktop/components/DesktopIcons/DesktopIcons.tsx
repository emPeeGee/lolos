import { useDesktopStore } from '../../store/desktopStore';
import { IconFactory } from './IconFactory';

export function DesktopIcons() {
  const { desktopIcons, selectedIcons, setSelectedIcons, addSelectedIcon, clearSelectedIcons } =
    useDesktopStore();

  const handleIconClick = (event: React.MouseEvent, id: number | null) => {
    if (!id) {
      if (!event.shiftKey) {
        clearSelectedIcons();
      }
      return;
    }

    if (event.shiftKey) {
      addSelectedIcon(id);
    } else {
      setSelectedIcons([id]);
    }
  };

  return (
    <div className="h-screen w-screen" onClick={(event) => handleIconClick(event, null)}>
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
