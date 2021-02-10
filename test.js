// In the Main process
const { ipcMain } = require('electron')

ipcMain.handle('test', (event) => {
  console.log("lol");
})