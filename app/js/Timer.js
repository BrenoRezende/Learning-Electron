const moment = require('moment');

module.exports = class Timer {

    iniciar(elem) {
        let segundos = moment.duration(elem.textContent).asSeconds();
        setInterval(() => {
            elem.textContent = this._segundosParaTempo(segundos++);
        }, 1000);
    }

    parar() {

    }

    _segundosParaTempo(segundos) {
        return moment().startOf('day').seconds(segundos).format('HH:mm:ss');
    }
}