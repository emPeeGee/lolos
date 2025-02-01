import { DesktopIcons } from './DesktopIcons/DesktopIcons';

export function Desktop() {
  return (
    <div className="h-screen w-screen bg-[url(assets/images/wallpaper.png)] bg-cover bg-center">
      {/* <TopBar /> */}
      <DesktopIcons />
      {/* <Dock /> */}
    </div>
  );
}
