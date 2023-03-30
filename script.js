// Adiciona um listener de evento ao formulário de busca, que é acionado quando o formulário é submetido
document.querySelector('.busca').addEventListener('submit', async (event)=>{

    // Previnir que a página seja recarregada ao submeter o formulário
    event.preventDefault();

    // Obtém o valor do input de busca
    let input = document.querySelector('#searchInput').value;
    
    // Verifica se o input não está vazio
    if(input !== ''){

        // Limpa as informações anteriores da tela
        clearInfo();

        // Mostra uma mensagem de carregamento na tela
        showWarning('carregando...');

        // Faz uma requisição à API OpenWeatherMap usando a função fetch, que retorna uma Promise
        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
        ${encodeURI(input)}&units=metric&lang=pt_br&appid=415347d3a8251ad78d15378ab8d60016`);

        // Converte o resultado em um objeto JSON usando o método json(), que também retorna uma Promise
        let json = await results.json();

        // Verifica se o código retornado pela API é 200, indicando que a busca foi bem-sucedida
        if(json.cod === 200) {

            // Mostra as informações do clima na tela usando a função showInfo
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });

        }else{

            // Se a busca não for bem-sucedida, limpa as informações anteriores e mostra uma mensagem de erro na tela
            clearInfo();
            showWarning('Não encontramos esta localização.');
        }        
    }else{

        // Se o input estiver vazio, limpa as informações anteriores da tela
        clearInfo();
    }
});

// Mostra as informações do clima na tela
function showInfo(json) {

    // Limpa a mensagem de aviso da tela
    showWarning('');

    // Atualiza o título da página com o nome da cidade e do país
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;    

    // Atualiza a informação de temperatura na tela
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;

    // Atualiza a informação de velocidade do vento na tela
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    // Atualiza o ícone de temperatura na tela
    document.querySelector('.temp img').setAttribute('src', 
    `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    // Atualiza a direção do vento na tela
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    // Exibe as informações atualizadas na tela
    document.querySelector('.resultado').style.display = 'block';
}

// Limpa as informações do clima da tela
function clearInfo() {
    // Limpa a mensagem de aviso da tela
    showWarning('');
    // Esconde a seção de resultados da tela
    document.querySelector('.resultado').style.display = 'none';
}
// Mostra uma mensagem de aviso na tela
function showWarning(msg) {
    // Atualiza a mensagem de aviso na tela com o texto passado como parâmetro
    document.querySelector('.aviso').innerHTML = msg;
}