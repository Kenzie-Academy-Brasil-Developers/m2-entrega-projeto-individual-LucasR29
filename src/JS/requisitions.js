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
        
        return await instance.post('/auth/login', data)
        .then(res => {
            
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
        .then(res => {
            
            if(res.status >= 200 && res.status <= 203){
                Notification.toasty('Usuário criado com sucesso', 'green')
                const obj = {
                    email: data.email,
                    password: data.password
                }
                setTimeout( async () => {
                    await this.login(obj)
                }, 1000)
                
            }
        })
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
        
    }

    static async patchUser(data){
        
        return await instance.patch('/users', data)
        .then(res => {
            Notification.toasty('Usuário atualizado com sucesso', 'green')
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        })
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async coworkers(){
        return await instance.get('/users/departments/coworkers')
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async getCompaniesHome(){
        return await instance.get('/companies')
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async getAllCompanies(){
        return await instance.get('departments')
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async getDepartments(){
        return await instance.get('/users/departments')
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async editDepartments(data, uuid){
        return await instance.patch(`/departments/${uuid}`, data)
        .then(res => res)
        .then(Notification.toasty('Departamento editado com sucesso', 'green'))
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async createDepartment(data){
        return await instance.post('/departments',data)
        .then(res => res)
        .then(Notification.toasty('Departamento criado com sucesso', 'green'))
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async deleteDepartment(uuid){
        return await instance.delete(`/departments/${uuid}`)
        .then(res => {
            // Notification.toasty('Deletado com sucesso', 'green')
            // setTimeout(() => {
            //     window.location.reload()
            // }, 1000)
        })
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async getSectors(){
        return await instance.get('/sectors')
        .then(res => res)
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async createCompany(data){
        return await instance.post('/companies', data)
        .then(res => {
            Notification.toasty('Emppresa criada com sucesso')
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        })
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async getCompanyDepartments(companyUUID){
        return await instance.get(`/departments/${companyUUID}`)
        .then(res => res)
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async getWorkers(){
        return await instance.get('/users')
        .then(res => res)
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async noDepartment(){
        return await instance.get('/admin/out_of_work')
        .then(res => res)
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async editUserInfo(data, uuid){
        return await instance.patch(`/admin/update_user/${uuid}`, data)
        .then(res => res)
        .then(Notification.toasty('Informações atualizadas', 'green'))
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async dismiss(uuid){
        return await instance.patch(`/departments/dismiss/${uuid}`)
        .then(res => {
            Notification.toasty('Demitido com sucesso', 'green')
        })
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async hire(data){
        return await instance.patch('/departments/hire', data)
        .then(res => res)
        .then( Notification.toasty('Contratado com sucesso', 'green'))
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }

    static async delete(uuid){
        return await instance.delete(`/admin/delete_user/${uuid}`)
        .then(res => res)
        .then( Notification.toasty('Usuário deletado', 'green'))
        .catch(err => {
            Notification.toasty(err.response.data.error, 'red')
        })
    }
}

export {Api}