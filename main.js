const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const Data = require('./Data');
const Template = require('./Template');

let mainWindow = null;
let tray = null;
app.on('ready', () => {
    console.log('App iniciada.');
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    tray = new Tray(`${__dirname}/app/img/icon-tray.png`);
    const trayMenu = Menu.buildFromTemplate(new Template().geraTrayTemplate(mainWindow));
    tray.setToolTip('Escolha o curso que você está estudando no momento');
    tray.setContextMenu(trayMenu);

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
    app.quit();
});

let aboutWindow = null;

ipcMain.on('abrir-janela-sobre', () => {

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
    
        aboutWindow.on('closed', () => {
            aboutWindow = null;
        });

    }
    
    aboutWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
    aboutWindow.close();
});

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => { 
    console.log(`Curso: ${curso}, foi estudado por ${tempoEstudado}`);
    var data = new Data();
    data.salvaDados(curso, tempoEstudado);
});

ipcMain.on('curso-adicionado', (event, novoCurso) => {
    const trayMenu = Menu.buildFromTemplate(new Template().adicionaNovoCurso(mainWindow, novoCurso));
    tray.setToolTip('Escolha o curso que você está estudando no momento');
    tray.setContextMenu(trayMenu);
});