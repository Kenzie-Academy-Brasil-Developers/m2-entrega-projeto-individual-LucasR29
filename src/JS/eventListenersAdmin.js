import { Notification } from "./toasty.js"
import { Api } from "./requisitions.js"
import { departments, creatingWorker, renderWorkers} from "./dashboardAdmin.js"
/*--------------------Editar Departamento-----------------------------------------*/

const buttonEdit = document.getElementById('edit')
const formList = document.querySelectorAll('.forms')
const modal = document.getElementById('modalAttInfo')
const attButton = document.getElementById('attDepartment')
const modalTitle = document.getElementById('modalTitle')
const closeModal = document.getElementById('closeModal')

closeModal.addEventListener('click', (event) => {
    modal.style.display = 'none'
})

buttonEdit.addEventListener('click', async (event) => {
    if(buttonEdit.value == 2){
        Notification.toasty('Favor selecionar um departamento', 'red')
    }else{
        modal.style.display = 'flex'
    }

    formList.forEach(x => {
        if(x.id != 'editDepartment'){
            x.style.display = 'none'
        }else{
            x.style.display = 'flex'
            modalTitle.innerText = 'Informe a nova descrição'
        }
    })
})

async function editDepartment(){
    const newDescription = document.getElementById('newDepartmentDescription')
    const depdescription = document.getElementById('description')
    const obj = {
        description: newDescription.value
    }
    const data = await Api.editDepartments(obj, buttonEdit.value)
    depdescription.innerText = data.data.description
    newDescription.value = ''
    modal.style.display = 'none'
}

attButton.addEventListener('click', (event) => {
    event.preventDefault()
    editDepartment()
})

/*--------------------Criar Departamento-----------------------------------------*/
const openCreate = document.getElementById('openCreateDepartment')
const create = document.getElementById('createDepartment')
const filterDepartments = document.getElementById('selectDepartment')

openCreate.addEventListener('click', (event) => {
    if(openCreate.value == 2){
        Notification.toasty('Selecione uma empresa', 'red')
    }else{
        modal.style.display = 'flex'
        modalTitle.innerText = 'Informe os dados do departamento'
    }

    formList.forEach(x => {
        if(x.id != 'formCreateDepartment'){
            x.style.display = 'none'
        }else{
            x.style.display = 'flex'
        }
    })
})

async function createDepartment(){
    modalTitle.innerText = 'Informe os dados do departamento'
    const name = document.getElementById('name_department')
    const description = document.getElementById('description_department')

    const obj = {
        name: name.value,
        description: description.value,
        company_uuid: openCreate.value
    }
    const data = await Api.createDepartment(obj)
    modal.style.display = 'none'
    const depOption = document.createElement('option')
    depOption.innerText = data.data.name//NOME DEPARTAMENTO
    depOption.id = data.data.uuid //ID DO DEPARTAMENTO
    depOption.value = data.data.description//DESCRIÇÃO DO DEPARTAMENTO
            
    departments.push(data.data.uuid)
    filterDepartments.appendChild(depOption)

    name.value =''
    description.value = ''
}

create.addEventListener('click', (event) => {
    event.preventDefault()
    createDepartment()
})

/*--------------------Deletar Departamento---------------------------------------*/
const openDelete = document.getElementById('openDeleteDepartment')
const deleteDepartment = document.getElementById('deleteDepartment')

openDelete.addEventListener('click', (event) => {
    if(openDelete.value == 2){
        Notification.toasty('Selecione um departamento', 'red')
    }else{
        modal.style.display = 'flex'
        modalTitle.innerText = 'Deletar departamento selecionado?'
    }

    formList.forEach(x => {
        if(x.id != 'formDeleteDepartment'){
            x.style.display = 'none'
        }else{
            x.style.display = 'flex'
        }
    })
})

async function deletarDepartamento(){
    await Api.deleteDepartment(openDelete.value)
    filterDepartments.options[filterDepartments.selectedIndex].remove()

    const depdescription = document.getElementById('description')
    depdescription.innerText = ''
    modal.style.display = 'none'
}

deleteDepartment.addEventListener(('click'), async (event) => {
    event.preventDefault()
    await deletarDepartamento()
    window.location.reload()
})

/*--------------------Att user info---------------------------------------------*/

const buttonAttUserInfo = document.getElementById('attUserInfo')

async function editUserInfo(uuid){
    const work = document.getElementById('kindOfWork')
    const level = document.getElementById('professionalLevel')

    const obj ={
        kind_of_work: work.value,
        professional_level: level.value
    }
    const data = await Api.editUserInfo(obj, uuid)

    const erase = document.getElementsByClassName(buttonAttUserInfo.value)
    erase[0].style.display = 'none'
    creatingWorker(data.data)
    modal.style.display = 'none'
}

buttonAttUserInfo.addEventListener('click', async (event) => {
    event.preventDefault()
    editUserInfo(buttonAttUserInfo.value)
    
})

/*--------------------Demitir Funcionário----------------------------------------*/
const validation = new Set
const buttonDismiss = document.getElementById('dismissWorker')
const listWorkers = document.getElementById('workers')
let n = 1

buttonDismiss.addEventListener('click', async (event) => {
    event.preventDefault()

    await Api.dismiss(buttonDismiss.value)
    
    const uuid = buttonDismiss.value
    validation.delete(uuid)

    const erase = document.getElementsByClassName(uuid)
    listWorkers.removeChild(erase[0])

    modal.style.display = 'none'
})

/*--------------------Contratar Funcionário--------------------------------------*/

const openHire = document.getElementById('hire')
const buttonHire = document.getElementById('buttonHire')
const selectHire = document.getElementById('noDepartment')


async function renderHireOptions(){
    const data = await Api.noDepartment()

    data.data.forEach(x => {
        if(!validation.has(x.uuid)){
            const option = document.createElement('option')
            option.id = x.uuid
            const name = document.createElement('span')
            name.innerText = x.username + ' - '
            const profLevel = document.createElement('span')
    
            if(x.professional_level == null || x.professional_level.length < 3){
                profLevel.innerText = 'Desconhecido'
            }else{
                profLevel.innerText = x.professional_level
            }
    
            option.append(name, profLevel)
            selectHire.appendChild(option)
            //teste.push(x.uuid)
            validation.add(x.uuid)
        }
    })
}

openHire.addEventListener('click', async (event) => {
    if(openHire.value == 2){
        Notification.toasty('Selecione um departamento', 'red')
    }else{
        modal.style.display = 'flex'
        modalTitle.innerText = 'Selecione o funcionário'
    }
    
    formList.forEach(x => {
        if(x.id != 'hireWorker'){
            x.style.display = 'none'
        }else{
            x.style.display = 'flex'
        }
    })

    await renderHireOptions()
})

buttonHire.addEventListener('click', async (event) => {
    event.preventDefault()
    const uuid = selectHire.options[selectHire.selectedIndex].id
    const obj = {
        user_uuid: uuid,
        department_uuid: openHire.value
    }

    selectHire.remove(selectHire.selectedIndex)

    const data = await Api.hire(obj)
    
    modal.style.display = 'none'

    creatingWorker(data.data)
})