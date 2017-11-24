const { ipcRenderer } = require('electron');
const Timer = require('./Timer');
const Data = require('../../Data');

let $ = document.querySelector.bind(document);
let linkSobre = $('#link-sobre');
let botaoPlay = $('.botao-play');
let tempo = $('.tempo');
let curso = $('.curso');
let botaoAdicionarCurso = $('.botao-adicionar');
let campoAdicionarCurso = $('.campo-adicionar');

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
        new Notification('Timer', {
            body: `O curso ${curso.textContent} foi parado!`,
            icon: './img/stop-button.png'
        });
    } else {
        timer.iniciar(tempo);
        new Notification('Timer', {
            body: `O curso ${curso.textContent} foi inciado!`,
            icon: './img/play-button.png'
        });
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

botaoAdicionarCurso.addEventListener('click', () => {

    if(campoAdicionarCurso.value == '') 
        return;

    let novoCurso = campoAdicionarCurso.value;
    curso.textContent = novoCurso;
    tempo.textContent = '00:00:00';
    campoAdicionarCurso.value = '';

    ipcRenderer.send('curso-adicionado', novoCurso);
});

ipcRenderer.on('iniciar-ou-parar-app', () => {
    botaoPlay.click();
});