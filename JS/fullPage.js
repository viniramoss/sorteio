const dadosLocalStorage = localStorage.getItem('json');
const dadosContainer = JSON.parse(dadosLocalStorage);
const n = dadosContainer.dados.qtdTickets
let nVal
const body = document.getElementById('body');


const ulTickets = document.getElementById('ul-ticket')

userDados()
addTickets()

function userDados(){
    document.getElementById('nomeSorteio').textContent = dadosContainer.dados.nomeSorteio;
    document.getElementById('valorSorteio').textContent = dadosContainer.dados.valorTicket;
    document.getElementById('dataSorteio').textContent = dadosContainer.dados.dataSorteio.split('-').reverse().join('/');
    document.getElementById('username').textContent = dadosContainer.dados.username;
    document.getElementById('cidadeEstado').textContent = `${dadosContainer.dados.cidadeUser}/${dadosContainer.dados.estadoUser}`
}

function addTickets(){
     document.getElementById('ul-ticket')
    for(let i = 0; i <= n; i++){
        if(i < 10){
            ulTickets.innerHTML += `<li class="liTick">00${i}</li>`
        } else if( i < 100){
            ulTickets.innerHTML += `<li class="liTick">0${i}</li>`
        } else {
            ulTickets.innerHTML += `<li class="liTick">${i}</li>`
        }
        
    }
}




const numerosParticipantes = [];



const liTicket = document.querySelectorAll('.liTick');
function addActiveClass(){
    for(let i = 0; i <= n; i++) {
        liTicket[i].addEventListener('click', activeBtn);
    }
}
function activeBtn() {
    let _class = this.classList
    _class.toggle('active')
    
    let indexOf = numerosParticipantes.indexOf(this.textContent)
    if( indexOf >= 0){
        numerosParticipantes.splice(indexOf, 1) 
    } 
    if (_class.contains('active')){
        numerosParticipantes.push(this.textContent) 
    }

}
addActiveClass();




// sorteio
(function sorteio(){
    const refSor = document.querySelector('.refazSor')
    const sorteioBtn = document.getElementById('executar-sorteio');
    const sorteioBox = document.getElementById('sorteio-container');
    const fecharBox = document.getElementById('closeBtn-sorteio');
    const resultSorteio = document.querySelector('.resultadoSorteio p');

    function result(){
        let numero = Math.floor(Math.random() * numerosParticipantes.length)
        resultSorteio.textContent = nVal[numero]
    }

    function boxSorteio() {
        if( nVal !== undefined){
            sorteioBox.style.animation = `sorteioContainer .3s linear forwards`;
            result()
            body.style.overflow = 'hidden'
            for(let i = 0; i <= n; i++) {
                liTicket[i].removeEventListener('click', activeBtn);
            }
        } else {
            alert('Para realizar o sorteio voc?? precisa comprar um numero <3')
        }
    }
    function fechar() {
        sorteioBox.style.animation = `sorteioContainerRev .3s linear forwards`
        body.style.overflow = 'visible'
        for(let i = 0; i <= n; i++) {
            if( !(liTicket[i].classList.contains('marked')) ){
                liTicket[i].addEventListener('click', activeBtn);
            }
        }
    }
    refSor.addEventListener('click', result)
    fecharBox.addEventListener('click', fechar)
    sorteioBtn.addEventListener('click', boxSorteio);
})();












(function sandwichMenu(){


    function toggleMenu(event) {

        if (event.type === 'touchstart') {event.preventDefault()}

        arr.push('.')

        const navContainer = document.getElementById('nav-container');
        const _class = navContainer.classList

        const bodyContainer = document.getElementById('body');
        const _body = bodyContainer.classList

        if(( arr.length % 2) !== 0 ){
            _class.add('active')
           _body.add('active')
        } else {
            _class.remove('active')
           _body.remove('active')
        }
        const active = navContainer.classList.contains('active')
        event.currentTarget.setAttribute('aria-expanded', active)

        active ? event.currentTarget.setAttribute('aria-label', 'fechar menu') : event.currentTarget.setAttribute('aria-label', 'abrir menu')
        
        animateLinks()

        if(_body.contains('active')){
            bodyContainer.style.overflow = 'hidden'
        } else {
            bodyContainer.style.overflow = 'visible'
        }
    }

    function animateLinks(){    
            links.forEach((link, index) => {
                link.style.animation ? (link.style.animation = ``) : (link.style.animation = `aFade .3s ease forwards ${index / 7 + 0.001}s`);
            })
    }

    const btnMobileMenu = document.getElementById('mobile-menu')
    const links = document.querySelectorAll('.nav-menu a')

    const arr = []


    btnMobileMenu.addEventListener('click', toggleMenu)
    btnMobileMenu.addEventListener('touchstart', toggleMenu)

})();

window.addEventListener('resize', function () {
    let largura = window.innerWidth;

    if (largura < 550) 
        document.getElementById('nav-container').className = "";
});



(function payment(){


    const payCard = document.getElementById('pagamento');
    const buyBtn = document.getElementById('buy-btn');
    const showNumeros = document.querySelector('#showNumeros p');
    const closeBtn = document.getElementById('closeBtn');
    const comprarBtn = document.getElementById('comprarBtn');

    function toolsPay(){

        if(this.tagName === "BUTTON"){
            buyBtn.style.animation = `car .3s linear forwards`
            payCard.style.animation = `payCard .5 linear forwards 1s`
            body.style.overflow = 'hidden'

            for(let i = 0; i <= n; i++) {
                liTicket[i].removeEventListener('click', activeBtn);
            }
            
            
            
            const att = [];
            for(let i = 0; i < numerosParticipantes.length; i++){
                att.push(numerosParticipantes[i])
            }
            let contador = []
            for(let i = 0; i < n; i++){
                if(liTicket[i].classList.contains('marked')){
                    let ind = numerosParticipantes.indexOf( liTicket[i].textContent ) 
                    contador.push('.')
                }
            }
            att.splice(0, contador.length)
            showNumeros.textContent = att.join(' - ')


        } else {
            for(let i = 0; i <= n; i++) {
                if( !(liTicket[i].classList.contains('marked')) ){
                    liTicket[i].addEventListener('click', activeBtn);
                }
            }
            payCard.style.animation = `payCardReverse .5s linear forwards`
            body.style.overflowY = 'visible'
            buyBtn.style.animation = `carReverse .5s linear forwards`
        }
    }
    function fechaPagamento(){
        document.getElementById('loader').style.display = 'none';
        closeBtn.click();
        for(let numeroAtual = 0; numeroAtual < numerosParticipantes.length; numeroAtual++){
            for(let i = 0; i < n; i++){
                if(liTicket[i].textContent == numerosParticipantes[numeroAtual]){
                    liTicket[i].removeEventListener('click', activeBtn)
                    liTicket[i].classList.add('marked')
                }
            }
        }
        nVal = numerosParticipantes
        document.querySelector('#numeros-participantes p').textContent = numerosParticipantes.join(' - ');
        
    }
    function loadAdd(){
        document.getElementById('loader').style.display = 'block';
        setTimeout(fechaPagamento, 2000)
    }

    comprarBtn.addEventListener('click', loadAdd)

    buyBtn.addEventListener('click', toolsPay)
    closeBtn.addEventListener('click', toolsPay)
})();





