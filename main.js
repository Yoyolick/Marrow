const { app, BrowserWindow, ipcMain, dialog  } = require('electron')
const remote = require('electron').remote;
const Store = require('electron-store');
var fs = require('fs');

// WINDOW STUFF

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    frame: false,
    icon: 'photos/tomeIcon.ico',
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

//check games local dir

///TODO THIS SHIT WILL MOST LIKELY BREAK IN BUILD
var cartilageFolder = __dirname + "\\Games";

ipcMain.on('directory-operation', (event, arg) => {

  if(!fs.existsSync(cartilageFolder)){
    fs.mkdir(cartilageFolder, function(err){
      if (err){
        console.log(err);
      }
    });
  }

})

var gamesReturn = [];

ipcMain.on('fetch-cartilage', (event, arg) => {
  gamesReturn = [];
  if(arg == "listPresentCartilages"){

    fs.readdir(cartilageFolder, function(err, files) {
      if (err) {
        console.log("Error getting directory information.")
      } 
      else {

        console.log(files)
        files.forEach(function(file){
          console.log(file)
          if(file.split('.').pop() == 'cartilage'){
            console.log(JSON.parse(fs.readFileSync(cartilageFolder + '\\' + file)))
            //event.sender.send('games-returned', JSON.parse(fs.readFileSync(cartilageFolder + '\\' + file)));
            gamesReturn.push(JSON.parse(fs.readFileSync(cartilageFolder + '\\' + file)))
          }
        })
        event.sender.send('games-returned', gamesReturn);
      }
    })
  }
})