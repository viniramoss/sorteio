let count = [];
count.push('.')

function sendUser(event) {
    if (event.type === 'touchstart') {event.preventDefault()}



    if( document.getElementById('name').value !== 'User' || document.getElementById('pass').value !== '$1964' ) {

        if(document.getElementById('name').value !== 'User' && document.getElementById('pass').value !== '$1964') {
            alert('Usuario e Senha invalidos')
        } else if( document.getElementById('name').value !== 'User' ) {
            alert('Nome de usuario invalido')
        } else {
            alert('Senha invalida')
        }
        return
    }

    btn.classList.add('active')

    document.addEventListener('keypress', function(e) {

        if(e.key === "Enter"){
            btn.click()
        }

    })
    let change = setTimeout(changeWindow, 500)

}



const btn = document.getElementById("arrow");
btn.addEventListener( 'click', sendUser )
btn.addEventListener( 'touchstart', sendUser )

function changeWindow () {
    window.location.href = "HTML/userSide.html"
}

document.addEventListener('keypress', function(e) {
    if(e.key === "Enter"){
        btn.click()
    }
})





