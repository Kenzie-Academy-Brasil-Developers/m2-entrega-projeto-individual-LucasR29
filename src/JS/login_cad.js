import { Api } from "./requisitions.js";
import { Notification } from "./toasty.js";

const buttonCadastrar = document.getElementById('cadastrar')
const buttonLogin = document.getElementById('logar')
const userInfo = document.querySelectorAll('.cadastro')
const userInfoLogin = document.querySelectorAll('.login')


buttonCadastrar.addEventListener('click', async (event) => {
    event.preventDefault()
    if(userInfo[3].value == userInfo[4].value ){
        const obj = {
            password: userInfo[3].value,
            email: userInfo[0].value,
            professional_level: userInfo[2].value.toLowerCase(),
            username: userInfo[1].value
        }
        await Api.createUser(obj)
    }else{
        Notification.toasty('Senhas não combinam', 'red')
    }
})

buttonLogin.addEventListener('click', async (event) => {
    event.preventDefault()
    
    const obj = {
        email: userInfoLogin[0].value,
        password: userInfoLogin[1].value
    }
    
    await Api.login(obj)
})

