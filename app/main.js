const path = require('path');

const {
  app,
  Menu,
  Tray,
  systemPreferences
} = require('electron');

// Declares a variable in the global scope that eventually stores a reference to the tray instance
let tray = null;

const getIcon = () => {
  if (process.platform === 'win32') return 'icon-dark.png';

  // to detect if macOS is in dark mode
  if (systemPreferences.isDarkMode() ) return 'icon-light.png';
  return 'icon-light@2x.ico';
};

app.on('ready', () => {
  // Hides the dock icon if running on macOS.
  if (app.dock) app.dock.hide();

  // Creates a tray instance by calling the constructor with a path to an image
  tray = new Tray(path.join(__dirname, '/Icon.png'));
  // tray = new Tray(path.join(__dirname, getIcon() ) );

  // On Windows, we register a click event listener to open the menu.
  if (process.platform === 'win32') {
    tray.on('click', tray.popUpContextMenu);
  }

  const menu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click() { app.quit(); }
    }
  ]);

  tray.setToolTip('Clipmaster');

  // sets the menu that appears when the user clicks the icon in the menu or
  // system tray in macOS and Windows, respectively.
  tray.setContextMenu(menu);
});
