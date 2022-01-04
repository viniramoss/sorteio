
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


function animation(){
    Array.from(formUser.elements).forEach( (input, index, label) => {
        input.style.animation ? (input.style.animation = ``) : (input.style.animation = `translateUserInfo 0.8s ease-out forwards ${index / 9 + 0.1}s`);
    })
}

const formUser = document.getElementById('form-user');

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
    } else {
        city.style.display = 'none';
    }

    (function changeOptValue(){

        const requestURL = '../JS/e.json';

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
    })()
    
}


const valueState = document.getElementById('state')
valueState.addEventListener('change', showCity)

const city = document.getElementById('city')

city.style.display = 'none'



























































