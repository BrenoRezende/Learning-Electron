const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = class Data {

    salvaDados(curso, tempoEstudado) {
        let caminhoCurso = `${__dirname}/data`;
        if (!fs.existsSync(caminhoCurso))
            fs.mkdirSync(caminhoCurso);

        let arquivoCurso = `${caminhoCurso}/${curso}.json`;
        if (fs.existsSync(arquivoCurso)) {
            this._adicionaTempoAoCurso(arquivoCurso, tempoEstudado)
        } else {
            this._criaArquivoDeCurso(arquivoCurso, {})
                .then(msg => {
                    this._adicionaTempoAoCurso(arquivoCurso, tempoEstudado);
                })
                .catch(error => console.log(error));
        }
    }
    
    pegaDados(curso) {
        let arquivoCurso = `${__dirname}/data/${curso}.json`;
        return jsonfile.readFile(arquivoCurso)
            .then(dados => dados)
            .catch(error => error);
    }

    _adicionaTempoAoCurso(arquivoCurso, tempoEstudado) {
        let dados = {
            ultimoEstudo: new Date().toString(),
            tempo: tempoEstudado
        };

        jsonfile.writeFile(arquivoCurso, dados, {spaces: 2})
            .then(() => console.log('Tempo salvo com sucesso.'))
            .catch(error => console.log(error));
    } 

    _criaArquivoDeCurso(nomeArquivo, conteudoArquivo) {
        return jsonfile.writeFile(nomeArquivo, conteudoArquivo)
            .then(() => 'Arquivo criado')
            .catch(error => error);
    }
}