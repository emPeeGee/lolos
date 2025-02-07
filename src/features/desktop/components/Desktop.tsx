import { DesktopIcons } from './DesktopIcons/DesktopIcons';
import { MenuBar } from '@/features/desktop/components/MenuBar/MenuBar.tsx';
import { WindowManager } from '@/features/window';
import { UI_CONFIG } from '@/config';

export function Desktop() {
  return (
    <div className="w-screen h-screen max-h-screen bg-[url(assets/images/wallpaper.png)] bg-cover bg-center">
      <div className="flex flex-col h-full">
        <MenuBar />

        <div className={`relative w-screen h-[calc(100vh-${UI_CONFIG.MENU_BAR_HEIGHT}px)]`}>
          <DesktopIcons />
          <WindowManager />
        </div>
      </div>
      {/* <Dock /> */}
    </div>
  );
}
