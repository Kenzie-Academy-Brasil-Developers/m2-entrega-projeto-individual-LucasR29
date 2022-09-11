import { Api } from "./requisitions.js"

const usersNoDepartment = document.getElementById('buttonUsersNoDepartment')
const logout = document.getElementById('logout')
const company = document.getElementById('company')
const workers = document.getElementById('workers')
const formList = document.querySelectorAll('.forms')
const modal = document.getElementById('modalAttInfo')
const modalTitle = document.getElementById('modalTitle')
const buttonDeleteUser = document.getElementById('deleteUser')

logout.addEventListener('click', (event) => {
    localStorage.clear()
    window.location.replace('../../index.html')
})

async function deleteUser(uuid){
    await Api.delete(uuid)
}

async function renderUsers(){
    const data = await Api.noDepartment()
    
    company.style.display = 'none'
    workers.innerHTML = ''

    data.data.forEach(x => {
        const workerElement = document.createElement('li')
        workerElement.id = x.uuid
        
        const workerName = document.createElement('p')
        workerName.innerText = x.username
    
        const professionalLevel = document.createElement('span')
        professionalLevel.innerText = x.professional_level
                
        const buttonDeleteWorker = document.createElement('button')
        buttonDeleteWorker.innerText = 'Deletar'
        buttonDeleteWorker.id = x.uuid //ID FUNCIONÁRIO

        buttonDeleteWorker.addEventListener('click', (event) => {
            modal.style.display = 'flex'
            modalTitle.innerText = 'Deletar usuário?'
            formList.forEach(x => {
                if(x.id != 'formDeleteUser'){
                    x.style.display = 'none'
                }else{
                    x.style.display = 'flex'
                }
            })
            buttonDeleteUser.id = buttonDeleteWorker.id
        })

        workerElement.append(workerName, professionalLevel, buttonDeleteWorker)
        
        workers.appendChild(workerElement)
    })
}

usersNoDepartment.addEventListener('click', (event) => {
    renderUsers()
})

buttonDeleteUser.addEventListener('click', async (event) => {
    event.preventDefault()
    await deleteUser(buttonDeleteUser.id)
    renderUsers()
    modal.style.display = 'none'
})