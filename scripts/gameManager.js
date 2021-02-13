//click functions on welcome page
function addGame(){
    console.log("temp");
}

//create local folder for cartilage if not exists
ipcRenderer.send('directory-operation', 'gameCartilage');

//load all games into box
