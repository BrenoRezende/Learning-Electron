const { ipcRenderer } = require('electron');

class about {

    constructor() {
        this._aboutLink = document.querySelector('#about-link');
    }

    open() {
        ipcRenderer.send('open-about-window');
    }

    close() {
        ipcRenderer.send('close-about-window');
    }

}

let aboutWindow = new about();