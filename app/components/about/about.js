const { ipcRenderer } = require('electron');

class about {

    open() {
        ipcRenderer.send('open-about-window');
    }

    close() {
        ipcRenderer.send('close-about-window');
    }

}

let aboutWindow = new about();