const { app, BrowserWindow, ipcMain } = require('electron');
require('@electron/remote/main').initialize();

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    backgroundColor: '#1c1c1c',
    show: false,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true,
        sandbox: false
    }
  })


  mainWindow.loadFile('./CLIENT/HTML/load.html')
  require("@electron/remote/main").enable(mainWindow.webContents);
  mainWindow.webContents.openDevTools();

  mainWindow.once('ready-to-show', function (){
    mainWindow.show();
});

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
