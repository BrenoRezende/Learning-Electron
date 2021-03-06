const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require('electron');
const Data = require('./Data');
const Template = require('./Template');

let mainWindow = null;
let tray = null;
app.on('ready', () => {
    console.log('App iniciada.');
    mainWindow = new BrowserWindow({
        width: 800,
        height: 450
    });

    tray = new Tray(`${__dirname}/app/img/icon-tray.png`);
    const trayMenu = Menu.buildFromTemplate(Template.geraTrayTemplate(mainWindow));
    tray.setToolTip('Escolha o curso que você está estudando no momento');
    tray.setContextMenu(trayMenu);

    Menu.setApplicationMenu(Menu.buildFromTemplate(Template.geraMenuPrincipal(app)));

    globalShortcut.register('CmdOrCtrl+Shift+S', () => {
        mainWindow.send('iniciar-ou-parar-app');
    });

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
    const trayMenu = Menu.buildFromTemplate(Template.adicionaNovoCurso(mainWindow, novoCurso));
    tray.setToolTip('Escolha o curso que você está estudando no momento');
    tray.setContextMenu(trayMenu);
});