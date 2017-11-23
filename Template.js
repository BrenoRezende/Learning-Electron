
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

    adicionaNovoCurso(window, curso) {
        let menu = this.geraTrayTemplate(window);
        menu.push({
            label: curso, type: 'radio', checked: true, click: () => { window.send('curso-trocado', curso) }
        });

        return menu;
    }
}