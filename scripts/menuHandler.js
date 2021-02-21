const {remote, ipcRenderer, dialog}=require('electron');
var win = remote.getCurrentWindow();

function closeWindow(){
    win.close();
}

function minWindow(){
    win.minimize();
}

function dropDownBox() {
    document.getElementById("gameDropdown").classList.toggle("show");
    document.getElementById("dropDown").classList.toggle("upwards");
}

function addGamePopup(){
    document.getElementById("addGamePopup").classList.toggle("showpopup");
    //TODO idk why but i cant toggle visibility of the dropdown here
}

function newGamePopup()
{
    document.getElementById("newGamePopup").classList.toggle("showNewGame");
}

function locateGame(){
    ipcRenderer.send('file-browse', 'browseGame')
}

function settingsPopUp(){
    document.getElementById("settingsPopUp").classList.toggle("showSettings");
}

//console.log(ipcRenderer.sendSync('synchronous-message', 'sync ping')) 

// Async message handler
ipcRenderer.on('browse-result', (event, arg) => {

    document.getElementById('gamePathText').innerText = arg[0]

    var folders = arg[0].split("\\")

    if(folders[folders.length - 1] == 'BONEWORKS'){
        document.getElementById('autoPredictText').innerText = folders[folders.length - 1];
    }

    else{
        var autoDetectedSuccess = false;
        document.getElementById('autoPredictText').innerText = "Marrow could not detect a pre configured game at this path"
    }

    if(!autoDetectedSuccess){
        document.getElementById("uploadCartilage").classList.toggle("show");
    }

})

// Async message sender
//ipcRenderer.send('asynchronous-message', 'async ping')