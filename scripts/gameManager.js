//click functions on welcome page
//TODO if no cartilages show welcome screen and prompt uploading them

//create local folder for cartilage if not exists
ipcRenderer.send('directory-operation', 'gameCartilage');

//check root carilage for new games
//TODO ASSIGN MARROW ICON TO .CARTILAGE

//var configuredGames = store.get('configuredGames');

ipcRenderer.send('fetch-cartilage', 'listPresentCartilages');

//load all games into box

var selectedgame = "";

var configuredGames = []
var gameCount = 0;
//TODO this implemation is literally dogshit im doing this at 1:32am

ipcRenderer.on('games-returned', (event, arg) => {
    configuredGames = []
    gameCount = 0;
    configuredGames.push(arg);

    if(configuredGames == undefined || configuredGames[0].length == 0){

        window.location= "welcome.html"
        console.log('redirected to welcome due to no cartilage')
    }
    console.log(configuredGames)
    configuredGames.forEach(function(game){
        console.log(game)
        gameCount+=1;
        var newDropItem = document.createElement('a');
        newDropItem.classList.add('dropdown-content')
        newDropItem.textContent = (game[gameCount - 1][0].gameName).toString()
        newDropItem.style.marginTop = (gameCount * 50).toString() + "px"
        newDropItem.setAttribute("id",(game[gameCount - 1][0].gameName).toString())
        newDropItem.onclick = function changeGame(){
            document.getElementById("selectedGameText").innerText = (game[gameCount - 1][0].gameName).toString();
            selectedgame = (game[gameCount - 1][0].gameName).toString();
        };
        document.getElementById('gameDropdown').appendChild(newDropItem);
    })

    //create add game button at bottom
    gameCount+=1;
    var newDropItem = document.createElement('a');
    newDropItem.classList.add('dropdown-content');
    newDropItem.textContent = 'Add A New Game';
    newDropItem.style.marginTop = (gameCount * 50).toString() + "px"
    document.getElementById('gameDropdown').appendChild(newDropItem);

})