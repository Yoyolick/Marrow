const { app, BrowserWindow, ipcMain, dialog  } = require('electron')
const remote = require('electron').remote;

// WINDOW STUFF

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// OTHER STUFF

// Event handler for asynchronous incoming messages
ipcMain.on('file-browse', (event, arg) => {

  if(arg == "browseGame"){
    event.sender.send('browse-result', dialog.showOpenDialogSync({ properties: ['openDirectory'], title: 'Add A New Marrow Game'}))
  }

})


//ipcMain.on('asynchronous-message', (event, arg) => {
//  if(arg == "browseGame"){
//    event.sender.send('asynchronous-reply', dialog.showOpenDialogSync({ properties: ['openDirectory'], title: 'Add A New Marrow Game', defaultPath: 'desktop'}))
//  }
//
//})

// Event handler for synchronous incoming messages
//ipcMain.on('synchronous-message', (event, arg) => {
//  console.log(arg) 
//
//  // Synchronous event emmision
//  event.returnValue = 'sync pong'
//})

// select folder