const dadosLocalStorage = localStorage.getItem('json');
const dadosContainer = JSON.parse(dadosLocalStorage);
const n = dadosContainer.dados.qtdTickets

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
    
    for(let i = 0; i <= n; i++){
        if(i < 10){
            document.getElementById('ul-ticket').innerHTML += `<li class="liTick"> 00${i}</li>`
        } else if( i < 100){
            document.getElementById('ul-ticket').innerHTML += `<li class="liTick"> 0${i}</li>`
        } else {
            document.getElementById('ul-ticket').innerHTML += `<li class="liTick"> ${i}</li>`
        }
        
    }
}
const liTicket = document.querySelectorAll('.liTick');
function addActiveClass(){
    for(let i = 0; i <= n; i++) {
        liTicket[i].addEventListener('click', activeBtn);
    }
}
function activeBtn() {
    let _class = this.classList
    _class.toggle('active')

}
addActiveClass();





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




