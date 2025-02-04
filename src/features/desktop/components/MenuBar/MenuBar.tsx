import { useState } from 'react';
import { motion } from 'framer-motion';
import { UI_CONFIG } from '@/config';
// import { Battery, Wifi, Clock } from 'lucide-react';

const menuItems = [
  { label: 'Lolos', submenu: ['About This Mac', 'System Preferences', 'Sleep'] },
  { label: 'File', submenu: ['New Window', 'Open', 'Close'] },
  { label: 'Edit', submenu: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste'] },
  { label: 'View', submenu: ['Enter Full Screen', 'Minimize'] },
];

export const MenuBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuClick = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  return (
    <div
      style={{ height: UI_CONFIG.MENU_BAR_HEIGHT }}
      className="macos-header w-screen flex justify-between items-center px-4 select-none"
    >
      <div className="flex space-x-4">
        {menuItems.map(({ label, submenu }) => (
          <div
            key={label}
            className={`relative rounded-sm ${activeMenu === label ? 'bg-zinc-400' : ''}`}
          >
            <button
              className="text-sm px-2"
              onClick={() => handleMenuClick(label)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleMenuClick(label);
              }}
            >
              {label}
            </button>
            {activeMenu === label && (
              <motion.ul
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute z-10 left-0 w-48 bg-zinc-300 shadow-lg rounded-md overflow-hidden"
              >
                {submenu.map((item) => (
                  <li key={item} className="text-sm px-4 py-1 hover:bg-zinc-500 cursor-pointer">
                    {item}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        ))}
      </div>
      <div className="flex space-x-4 items-center">
        {new Date().toDateString()}
        {/*<Wifi size={18} />*/}
        {/*<Battery size={18} />*/}
        {/*<Clock size={18} />*/}
      </div>
    </div>
  );
};
