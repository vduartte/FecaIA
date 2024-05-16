const button = document.getElementById('button--user');

const consultaGemini = async (question) => {
    const keyGoogle = 'AIzaSyBZaybh57iVi23jcLvzuIrabNG4f3td60A';

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + keyGoogle;

    const requestData = {
        contents: [
            {
                parts: [
                    {
                        text: `${question}`
                    }
                ]
            }
        ]
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    }

    await fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
        const answerIa = data.candidates[0].content.parts[0].text;
        responseIa(answerIa);
    });
}

const responseIa = async (answerIa) => {
    const textAreaPt = document.getElementById('answer--pt');
    textAreaPt.textContent = answerIa;

    
    const translatedAnswer = await traduzirTexto(answerIa);

    //Criação da caixa em INGLES (answerEN)
    const textAreaEn = document.getElementById('answer--en');
    textAreaEn.textContent = translatedAnswer;
}
// Crianção da Variavel nova (const do Answer--en)
//const traduzirTexto
const traduzirTexto = async (texto) => {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=pt|en`;


    //Exceção 
    try {
        const response = await fetch(url);
        const data = await response.json();
        //Pega o codigo e trabalha dentro da URL,o TranslatedText para converter para PT
        // Pega o respondeData e apos a tradução que é TranslatedText
        return data.responseData.translatedText;

        //Catch para entrar o Erro, caso tenha no codigo.
    } catch (error) {
        console.error('Erro ao traduzir texto:', error);
        return null;
    }
}

button.addEventListener('click', () => {
    const question = document.getElementById('ask--user').value;
    consultaGemini(question);
});
