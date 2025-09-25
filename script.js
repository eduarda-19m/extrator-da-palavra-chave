import { PALAVRAS_RUINS } from "./palavrasRuins.js";

const botaoMostraPalavras = document.querySelector('#botao-palavrachave');
const campoDeTexto = document.querySelector('#entrada-de-texto');
const campoResultado = document.querySelector('#resultado-palavrachave');

botaoMostraPalavras.addEventListener('click', () => {
    const texto = campoDeTexto.value;
    const palavrasChave = processaTexto(texto);
    
    campoResultado.textContent = palavrasChave.join(", ");
});

function processaTexto(texto) {
    // 1. Divide o texto em palavras e converte para minúsculas
    const palavras = texto.toLowerCase().split(/\P{L}+/u);

    // 2. Filtra as palavras, removendo "palavras ruins" e palavras curtas
    const palavrasBoas = palavras.filter(palavra => 
        !PALAVRAS_RUINS.has(palavra) && palavra.length > 2
    );

    // 3. Conta a frequência de cada palavra boa
    const frequencias = contaFrequencias(palavrasBoas);

    // 4. Ordena as palavras pela frequência e pega as 10 mais relevantes
    const palavrasOrdenadas = Object.keys(frequencias).sort((p1, p2) => 
        frequencias[p2] - frequencias[p1]
    );

    return palavrasOrdenadas.slice(0, 10);
}

// Otimização: percorre o array apenas uma vez
function contaFrequencias(palavras) {
    const frequencias = {};
    for (const palavra of palavras) {
        frequencias[palavra] = (frequencias[palavra] || 0) + 1;
    }
    return frequencias;
}