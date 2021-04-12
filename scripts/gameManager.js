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
var selectedCategory = "";
var configuredGames = []
var gameCount = 0;
var categoryData;

//TODO this implemation is literally dogshit im doing this at 1:32am

ipcRenderer.on('games-returned', (event, arg) => {
    configuredGames = []
    gameCount = 0;
    configuredGames.push(arg);

    if (configuredGames == undefined || configuredGames[0].length == 0) {

        window.location = "welcome.html"
        console.log('redirected to welcome due to no cartilage')
    }

    configuredGames[0].forEach(function (game) {
        gameCount += 1;
        console.log('game detected: ' + (game[0].gameName).toString())
        var newDropItem = document.createElement('a');
        newDropItem.classList.add('dropdown-content')
        newDropItem.textContent = (game[0].gameName).toString()
        newDropItem.style.marginTop = (gameCount * 50).toString() + "px"
        newDropItem.setAttribute("id", (game[0].gameName).toString())
        newDropItem.onclick = function changeGame() {
            document.getElementById("selectedGameText").innerText = (game[0].gameName).toString();
            selectedgame = game;
            loadCategories();
        };
        document.getElementById('gameDropdown').appendChild(newDropItem);
    })

    //create add game button at bottom
    gameCount += 1;
    var newDropItem = document.createElement('a');
    newDropItem.classList.add('dropdown-content');
    newDropItem.textContent = 'Add A New Game';
    newDropItem.style.marginTop = (gameCount * 50).toString() + "px";
    document.getElementById('gameDropdown').appendChild(newDropItem);

    //change defualt dropdown text
    document.getElementById("selectedGameText").innerText = "";
    selectedgame = "";

    //reload categories
    loadCategories();
})

function loadCategories() {
    //delete present categories
    var el = document.getElementById('sidebar');
    while (el.firstChild) el.removeChild(el.firstChild);
    if (selectedgame != "") {

        var cats = selectedgame[0]

        for (const property in cats.categories) {
            console.log(`${property}`);
            var newCategory = document.createElement('div');
            newCategory.textContent = `${property}`;
            newCategory.classList.add('category');
            newCategory.onclick = function changeGame() {
                selectedCategory = `${property}`;
                categoryData = cats.categories;
                console.log(categoryData)
                ipcRenderer.send('retrieve-mods', categoryData);
            };
            document.getElementById('sidebar').appendChild(newCategory);
        }

        document.getElementById('noGame').classList.add("hidden");
        //document.getElementById('noCategory').classList.add("hidden");
    } else {
        document.getElementById('noGame').classList.remove("hidden");
    }

}