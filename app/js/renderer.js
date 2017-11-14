const { ipcRenderer } = require('electron');
const Timer = require('./Timer');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');


linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['./img/play-button.svg', './img/stop-button.svg'];
let playing = false;
let timer = new Timer();
botaoPlay.addEventListener('click', function() {

    if(playing) {
        timer.parar();
    } else {
        timer.iniciar(tempo);
    }

    playing = !playing;
    imgs.reverse();
    botaoPlay.src = imgs[0];
});
