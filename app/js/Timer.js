const { ipcRenderer } = require('electron');
const moment = require('moment');

module.exports = class Timer {

    constructor() {
        this._timer;
        this._segundos;
    }

    iniciar(elem) {
        this._segundos = moment.duration(elem.textContent).asSeconds();
        this._timer = setInterval(() => {
            elem.textContent = this._segundosParaTempo(this._segundos++);
        }, 1000);
    }

    parar(curso) {
        clearInterval(this._timer);
        let tempoEstudado = this._segundosParaTempo(this._segundos);
        ipcRenderer.send('curso-parado', curso, tempoEstudado);
    }

    _segundosParaTempo(segundos) {
        return moment().startOf('day').seconds(segundos).format('HH:mm:ss');
    }
}