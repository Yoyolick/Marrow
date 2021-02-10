// In the Renderer process
const { ipcRenderer } = require('electron');

ipcRenderer.send("test");

console.log("lmao");