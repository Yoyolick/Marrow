const {remote}=require('electron');
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

window.onclick = function(e) {
    if (!e.target.matches('.gameSelect')) {
        var myDropdown = document.getElementById("dropContent");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}