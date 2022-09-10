import { Notification } from "./toasty.js"

export const token = localStorage.getItem('userToken')


const instance = axios.create({
    baseURL:'http://localhost:6278/',
    timeout: 10000,
    headers: {
        "Content-Type" : "application/json",
        Authorization: `Token ${token}`,
    }
})

class Api{
    static async login(data){
        console.log(data)
        return await instance.post('/auth/login', data)
        .then(res => {
            console.log(res)
            localStorage.setItem('userToken', res.data.token)
            localStorage.setItem('userUUID', res.data.uuid)
            if(res.data.is_admin === false){
                window.location.replace('./src/pages/dashboardNormal.html')
            }else if(res.data.is_admin === true){
                window.location.replace('./src/pages/dashboardAdmin.html')
            }
            
        })
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }


    static async createUser(data){
        return await instance.post('/auth/register/user', data)
        .then(async res => {
            console.log(res)
            if(res.status >= 200 && res.status < 203){
                const obj = {
                    email: data.email,
                    password: data.password
                }
                console.log(obj)
                await this.login(obj)
            }
        })
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
        
    }

    static async patchUser(data){
        console.log(data)
        return await instance.patch('/users', data)
        .then(res => {
            console.log(res)
            Notification.toasty('Usuário atualizado com sucesso', 'green')
        })
        .catch(err => {
            Notification.toasty(err.response.data.error)
        })
    }

    static async coworkers(){
        return await instance.get('/users/departments/coworkers')
        .catch(err => {
            Notification.toasty(err.response.data.error)
        })
    }

    static async getCompany(){
        return await instance.get('')
    }

    static async getDepartments(){
        return await instance.get('/users/departments')
        .catch(err => {
            Notification.toasty(err.response.data.error)
        })
    }

    static async getCompanies(){
        return await instance.get('companies')
        // .then(res => console.log(res))
        // .catch(err => console.log(err))
    }
}

export {Api}