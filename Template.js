const process = require('process');
const { ipcMain } = require('electron');

module.exports = class Template {

    static geraTrayTemplate(window) {
        let menu = [
            { label: 'Cursos' },
            { type: 'separator' },
            { label: 'Electron', type: 'radio', click: () => { window.send('curso-trocado', 'Electron') } },
            { label: 'MongoDB', type: 'radio', click: () => { window.send('curso-trocado', 'MongoDB') } },
            { label: 'Nodejs', type: 'radio', click: () => { window.send('curso-trocado', 'Nodejs') } },
            { label: 'React', type: 'radio', click: () => { window.send('curso-trocado', 'React') } }
        ];

        return menu;
    }

    static adicionaNovoCurso(window, curso) {
        let menu = this.geraTrayTemplate(window);
        menu.push({
            label: curso, type: 'radio', checked: true, click: () => { window.send('curso-trocado', curso) }
        });

        return menu;
    }

    static geraMenuPrincipal(app) {
        let menu = [
            {
                role: 'window',
                submenu: [
                    { role: 'minimize' },
                    { role: 'close' }
                ]
            },
            {
                label: 'About',
                submenu: [
                    { label: 'About Timer', click: () => { ipcMain.emit('abrir-janela-sobre') } }
                ]
            }
        ];

        if (process.platform == 'darwin') {
            menu.unshift({
                label: app.getName(),
                submenu: [
                    { label: 'About Timer', click: () => { ipcMain.emit('abrir-janela-sobre') } },
                    { type: 'separator' },
                    { role: 'services', submenu: [] },
                    { type: 'separator' },
                    { role: 'hide' },
                    { role: 'hideothers' },
                    { role: 'unhide' },
                    { type: 'separator' },
                    { role: 'quit' }
                ]
            });
        }

        return menu;
    }
    
}