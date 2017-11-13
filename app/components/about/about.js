const { ipcRenderer, shell } = require('electron');
const process = require('process');

class about {

    constructor() {
        this.showVersion(document.querySelector('#electron-version'));
    }

    static open() {
        ipcRenderer.send('open-about-window');
    }

    close() {
        ipcRenderer.send('close-about-window');
    }

    linkGithub() {
        shell.openExternal('https://www.github.com/BrenoRezende');
    }
    
    showVersion(elem) {
        elem.textContent = process.versions.electron;
    }

}