window.localStorage.clear() ;

(function fileClick(){
    const inputFile = document.getElementById('input-file');
    const btnFile = document.getElementById('btn-file');
    btnFile.addEventListener('click', function(event) {
        if(event.type === "click"){
            inputFile.click()
        }
    })
    btnFile.addEventListener('touchstart', function(event) {
        if(event.type === "touchstart"){
            inputFile.click()
        }
    })
})()
const formUser = document.getElementById('form-user');
function animation(){
    Array.from(formUser.elements).forEach( (input, index, label) => {
        input.style.animation ? (input.style.animation = ``) : (input.style.animation = `translateUserInfo 0.8s ease-out forwards ${index / 9 + 0.1}s`);
    })
}
animation()
function altValue(){
    const valueTicket = document.getElementById('valor')
    
    if( valueTicket.focus ){
        valueTicket.value = 'R$'
    }
}
function showCity(){

    const childForm = formUser.querySelectorAll('select')

    if(valueState.value !== 'defaultState'){
        city.style.display = 'block'

        childForm[1].style.animation = ''

        childForm[1].style.opacity = '1'

        childForm[1].style.transform = 'translate(0,0)'

        changeOptValue()
    } else {
        city.style.display = 'none';
    }
}
function changeOptValue(){

    const requestURL = '../JS/cidades.json';

    const request = new XMLHttpRequest();
    request.open('GET', requestURL)
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var arr = request.response;

        let x = arr.estados.findIndex( x => x.sigla === valueState.value)

        const select = document.querySelector('#city');

        let length = select.options.length;
        for (i = length-1; i >= 0; i--) {
        select.options[i] = null;
        }

        select.options[select.options.length] = new Option('Selecione sua cidade', 'defaultCity')

        for(let i = 0; i < arr.estados[x].cidades.length; i++){
            select.options[select.options.length] = new Option(arr.estados[x].cidades[i], arr.estados[x].sigla );
        }
    }
}
function dadosUser(){
    const requestURL = '../JS/dadosUser.json';

    const request = new XMLHttpRequest();
    request.open('GET', requestURL)
    request.responseType = 'json';
    request.send();
    request.onload = function() {

        let optCity = city.children[city.selectedIndex];

        var dadosContainer = request.response;

        if(

            nomeSorteio.value !== '' &&
            valorTicket.value !== '' &&
            dataSorteio.value !== '' &&
            username.value    !== '' &&
            valueState.value  !== 'defaultState' &&
            city.value        !== 'defaultCity' &&
            qtdTickets.value  !== 'defaultRifa'
        ){
            dadosContainer.dados.nomeSorteio = nomeSorteio.value;
            dadosContainer.dados.valorTicket = valorTicket.value;
            dadosContainer.dados.dataSorteio = dataSorteio.value;
            dadosContainer.dados.username = username.value;
            dadosContainer.dados.estadoUser = valueState.value;
            dadosContainer.dados.cidadeUser = optCity.textContent;
            dadosContainer.dados.qtdTickets = qtdTickets.value;
        } else {
            alert('Por gentileza, preencha todos os campos <3');
            return
        }




        localStorage.setItem('json',JSON.stringify( dadosContainer))

        setTimeout(changeWindow, 200)
    }
}
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener('click', dadosUser);


const nomeSorteio = document.getElementById('nSorteio');
const valorTicket = document.getElementById('valor');
const dataSorteio = document.getElementById('date');
const username    = document.getElementById('username');

const valueState = document.getElementById('state');
valueState.addEventListener('change', showCity);

const city = document.getElementById('city');

city.style.display = 'none';

const qtdTickets = document.getElementById('qtdTickets');



function changeWindow () {
    window.location.href = "fullPage.html"
}

const dataAtual = new Date();
let dia = dataAtual.getDate();
let mes = dataAtual.getMonth() + 1;
let ano = dataAtual.getFullYear();

if(parseInt(dia) < 10){
    dia = '0'+dia
}
if(parseInt(mes) < 10){
    mes = '0'+mes
}



dataSorteio.min = `${ano}-${mes}-${dia}`;
dataSorteio.value = `${ano}-${mes}-${dia}`;



