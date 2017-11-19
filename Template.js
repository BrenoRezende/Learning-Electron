
module.exports = class Template {

    geraTrayTemplate(window) {
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
}