import { Api } from "./requisitions.js"

const logout = document.getElementById('logout')
const openModaledit = document.getElementById('editInfo')
const closeModal = document.getElementById('closeModal')
const closeSideBar = document.getElementById('closeButton')
const buttonAttInfo = document.getElementById('buttonAttInfo')
const modalAttinfo = document.getElementById('modalAttInfo')
const showSideBar = document.getElementById('showSideBar')

logout.addEventListener('click', (event) => {
    localStorage.clear()
    window.location.replace('../../index.html')
})

openModaledit.addEventListener('click', (event) => {
    modalAttinfo.style.display = 'flex'
})

showSideBar.addEventListener('click', (event) =>{
    body.classList.remove('preload')
    sideBar.classList.add('showSideBar')
})

closeSideBar.addEventListener('click', (event) => {
    sideBar.classList.remove('showSideBar')
})

closeModal.addEventListener('click', (event) => {
    modalAttinfo.style.display = 'none'
})

buttonAttInfo.addEventListener('click', (event) => {
    event.preventDefault()
    editInfo()
})

async function editInfo(){
    const data = document.querySelectorAll('.cadastro')
    
    if(data[3].value == data[2].value){
        const obj = {
            username: data[1].value,
            email:data[0].value,
            password: data[2].value
        }
        await Api.patchUser(obj)
    }else{
        Notification.toasty('Senhas não batem')
    }
}