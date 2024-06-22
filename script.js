let keyWords = new Map([
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
]);


function getInputText(actionCrypt) {
    let textarea = document.querySelector('textarea');

    if (actionCrypt === 'encrypt')
        encrypt(keyWords, textarea.value);
    else {
        decrypt(keyWords, textarea.value);
    }
}

function encrypt (keyWords, input) {
    let inputArray = input.split('');

    for (let i = 0; i < inputArray.length; i++) {
        keyWords.forEach((valor, chave) => {
            if (inputArray[i] == chave) {
                inputArray[i] = valor;
            }
        });
    }
    
    resultView(inputArray.join(''));
}

function decrypt (keyWords, input) {
    let encoded = false;

    for (let valor of keyWords.values()) {
        if (input.includes(valor)) {
            encoded = true;
            break;
        }
    }

    if (!encoded) {
        alert('Uma análise foi feita, não é possível que esse texto tenha sido codificado aqui ainda!');
        return;
    }

    let inputArray = input.split('');

    for (let i = 0; i < inputArray.length; i++) {
        keyWords.forEach((valor, chave) => {
            if (inputArray[i] == chave) {
                for (let j = 1; j < valor.split('').length; j++) {
                    inputArray[i+j] = '';
                }
            }
        });
    }
    
    resultView(inputArray.join(''));
}

function resultView (resultText) {
    let resultTextView = document.getElementById('output-area__result-area__result-text');
    resultTextView.textContent = resultText;
}

async function copyToTransferArea () {
    let copyButton = document.getElementById('output-area__result-area__result-text');
    const copyText = copyButton.textContent;

    try {
        await navigator.clipboard.writeText(copyText);
        alert('Texto copiado para a área de transferência!');
    } catch (error) {
        console.error('Erro ao copiar texto:', error);
    }
}
