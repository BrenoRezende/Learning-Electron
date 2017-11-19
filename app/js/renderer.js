const { ipcRenderer } = require('electron');
const Timer = require('./Timer');
const Data = require('../../Data');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');

window.onload = () => {
    let data = new Data();
    data.pegaDados(curso.textContent)
        .then(dados => tempo.textContent = dados.tempo)
        .catch(error => console.log(error));    
};

linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['./img/play-button.svg', './img/stop-button.svg'];
let playing = false;
let timer = new Timer();
botaoPlay.addEventListener('click', function() {

    if(playing) {
        timer.parar(curso.textContent);
    } else {
        timer.iniciar(tempo);
    }

    playing = !playing;
    imgs.reverse();
    botaoPlay.src = imgs[0];
});

ipcRenderer.on('curso-trocado', (event, nomeCurso) => {
    let data = new Data();
    data.pegaDados(nomeCurso)
        .then(dados => tempo.textContent = dados.tempo)
        .catch(error => console.log(error));
    
    curso.textContent = nomeCurso;
});
