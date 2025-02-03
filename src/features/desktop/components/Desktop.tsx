import { DesktopIcons } from './DesktopIcons/DesktopIcons';
import { MenuBar } from '@/features/desktop/components/MenuBar/MenuBar.tsx';

export function Desktop() {
  return (
    <div className="w-screen h-screen max-h-screen bg-[url(assets/images/wallpaper.png)] bg-cover bg-center">
      <div className="flex flex-col h-full">
        <MenuBar />
        <DesktopIcons />
      </div>
      {/* <Dock /> */}
    </div>
  );
}
