const { app, BrowserWindow, ipcMain } = require('electron');

app.on('ready', () => {
    console.log('App iniciada.');
    let mainWindow = new BrowserWindow({
        width: 1366,
        height: 768
    });

    mainWindow.loadURL(`file://${__dirname}/app/main.html`);
});

app.on('window-all-closed', () => {
    app.quit();
});

let aboutWindow = null;

ipcMain.on('open-about-window', () => {

    if(!aboutWindow) {
        aboutWindow = new BrowserWindow({
            width: 400,
            height: 200,
            alwaysOnTop: true,
            minimizable: false,
            maximizable: false,
            resizable: false
        });

        aboutWindow.setMenu(null);
    }
    
    aboutWindow.on('closed', () => {
        aboutWindow = null;
    });

    aboutWindow.loadURL(`file://${__dirname}/app/components/about/about.html`);
});

ipcMain.on('close-about-window', () => {
    aboutWindow.close();
});