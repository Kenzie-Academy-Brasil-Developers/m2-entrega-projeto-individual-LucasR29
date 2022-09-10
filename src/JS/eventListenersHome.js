const showSideBar = document.getElementById('showSideBar')
const body = document.getElementById('body')
const closeButton = document.getElementById('closeButton')
const sideBar = document.getElementById('sideBar')
const closeModalLogin = document.getElementById('closeModalLogin')
const closeModalCadastro = document.getElementById('closeModalCadastro')
const modalCadastro = document.getElementById('modalCadastro')
const modalLogin = document.getElementById('modalLogin')
const openModalLogin = document.querySelectorAll('.buttonOpenModalLogin')
const openModalCadastro = document.querySelectorAll('.buttonOpenModalCadastrar')
const cadastroOptions = document.querySelectorAll('.cadastroOnly')
const loginOptions = document.querySelectorAll('.loginOnly')
const changeModal = document.querySelectorAll('a')
const buttonSubmit = document.getElementById('cadastrar')

showSideBar.addEventListener('click', (event) =>{
    body.classList.remove('preload')
    sideBar.classList.add('showSideBar')
})

closeButton.addEventListener('click', (event) => {
    sideBar.classList.remove('showSideBar')
})

closeModalLogin.addEventListener('click', (event) => {
    modalLogin.style.display = 'none'
})

closeModalCadastro.addEventListener('click', (event) => {
    modalCadastro.style.display = 'none'
})

openModalLogin.forEach(x => {
    x.addEventListener('click', (event) => {
        modalLogin.style.display = 'flex'
    })
})

openModalCadastro.forEach(x => {
    x.addEventListener('click', (event) => {
        modalCadastro.style.display = 'flex'
    })
})

changeModal.forEach(x => {
    if(x.innerText.includes('cadastrado')){
        x.addEventListener('click', (event) => {
            event.preventDefault()
            modalLogin.style.display = 'none'
            modalCadastro.style.display = 'flex'
        })
    }else{
        x.addEventListener('click', (event) => {
            event.preventDefault()
            modalLogin.style.display = 'flex'
            modalCadastro.style.display = 'none'
        })
    }
})

