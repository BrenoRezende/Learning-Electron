const moment = require('moment');

module.exports = class Timer {

    constructor() {
        this._timer;
    }

    iniciar(elem) {
        let segundos = moment.duration(elem.textContent).asSeconds();
        this._timer = setInterval(() => {
            elem.textContent = this._segundosParaTempo(segundos++);
        }, 1000);
    }

    parar() {
        clearInterval(this._timer);
    }

    _segundosParaTempo(segundos) {
        return moment().startOf('day').seconds(segundos).format('HH:mm:ss');
    }
}