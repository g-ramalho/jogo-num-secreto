let numerosSorteados = [];
let numeroLimite = 10;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;

document.getElementById('reiniciar').setAttribute('disabled', true);
limparCampo();
console.log(numeroAleatorio);

let inputDoNumero = document.getElementById('input');
inputDoNumero.addEventListener('keydown', (event) =>{
    if (event.key === 'Enter') {
        if (!(document.getElementById('chutar').hasAttribute('disabled'))) {
            verificarChute();
        }else{
            reiniciarJogo();
        }
    }
})

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    let mensagemInicialParagrafo = `Escolha um número entre 1 e ${numeroLimite}`;
    exibirTextoNaTela('p', mensagemInicialParagrafo);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroAleatorio) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativas = tentativas > 1 ? `tentativas` : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);
    } else {
        if (chute > numeroAleatorio) {
            exibirTextoNaTela('p', 'O número secreto é menor!');
        }else {
            exibirTextoNaTela('p', 'O número secreto é maior!');
        }

        tentativas++;
        limparCampo();
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdElementosNaLista = numerosSorteados.length;

    if (qtdElementosNaLista == numeroLimite) {
        numerosSorteados = [];
    }

    if (numerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }else {
        numerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function reiniciarJogo() {
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
    limparCampo();

    tentativas = 1;
    numeroAleatorio = gerarNumeroAleatorio();
}
