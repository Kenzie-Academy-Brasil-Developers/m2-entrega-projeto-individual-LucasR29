import { Api } from "./requisitions.js"

export let departments = []
const companyList = document.getElementById('menu')
const filterSectors = document.getElementById('filterCompanies')
const filterDepartments = document.getElementById('selectDepartment')
const description = document.getElementById('description')
const workersList = document.getElementById('workers')
const openDeleteDepartment = document.getElementById('openDeleteDepartment')
const editDepartment = document.getElementById('edit')
const hireWorker = document.getElementById('hire')
const buttonAttUserInfo = document.getElementById('attUserInfo')
const dismissWorker = document.getElementById('dismissWorker')
const openMenu = document.getElementById('showSideBar')
const closeSideBar = document.getElementById('closeButton')
const company = document.getElementById('company')

if(localStorage.getItem('userToken').length < 10 || localStorage.getItem('userUUID').length < 10){
    window.location.replace('../../index.html')
}

openMenu.addEventListener('click', (event) => {
    body.classList.remove('preload')
    sideBar.classList.add('showSideBar')
})
closeSideBar.addEventListener('click', (event) => {
    sideBar.classList.remove('showSideBar')
})

function openModal(titleText, filter){
    const formList = document.querySelectorAll('.forms')
    const modal = document.getElementById('modalAttInfo')
    const modalTitle = document.getElementById('modalTitle')
    modal.style.display = 'flex'
    modalTitle.innerText = titleText

    formList.forEach(x => {
        if(x.id != filter){
            x.style.display = 'none'
        }else{
            x.style.display = 'flex'
        }
    })
}

async function renderCompanyInfo(HTMLelement){
    company.style.display = 'flex'
    filterDepartments.innerHTML = ''
    
    const fixedOption = document.createElement('option')
    fixedOption.innerText = 'Todos'
    fixedOption.id = 2
    filterDepartments.appendChild(fixedOption)
    
    const data = await Api.getCompanyDepartments(HTMLelement.id)
    
    const companyName = document.querySelector('.companyInfo__name')
    companyName.innerText = HTMLelement.innerText//NOME EMPRESA

    const company_hours = document.getElementById('companyInfo__hours')
    company_hours.innerText = 'Abre às: ' + HTMLelement.firstElementChild.innerText

    const createDepartment = document.getElementById('openCreateDepartment')
    createDepartment.value = HTMLelement.id
    
    departments = []

    if(data.data.length > 0){
        data.data.forEach(x => {
            const depOption = document.createElement('option')
            depOption.innerText = x.name//NOME DEPARTAMENTO
            depOption.id = x.uuid //ID DO DEPARTAMENTO
            depOption.value = x.description//DESCRIÇÃO DO DEPARTAMENTO
            
            departments.push(x.uuid)
            filterDepartments.appendChild(depOption)
        })
    }
    renderWorkers(departments)
}

export function creatingWorker(x){
    const workerElement = document.createElement('li')
    workerElement.id = x.department_uuid
    workerElement.classList.add(x.uuid)//ID FUNCIONÁRIO
    
    const workerName = document.createElement('p')
    workerName.innerText = x.username
    
    const divWorkInfo = document.createElement('div')
    divWorkInfo.classList.add('userWorkInfo')

    const professionalLevel = document.createElement('span')
    professionalLevel.innerText = x.professional_level

    const workerKindOfWork = document.createElement('span')
    workerKindOfWork.innerText = x.kind_of_work
    
    divWorkInfo.append(workerKindOfWork, professionalLevel)

    const divButtons = document.createElement('div')
    divButtons.classList.add('buttonsEditWorker')
    
    const buttonEditWorker = document.createElement('button')
    buttonEditWorker.innerText = 'Editar'
    buttonEditWorker.id = x.uuid //ID FUNCIONÁRIO

    buttonEditWorker.addEventListener('click', (event) => {
        openModal('Editar informações','editUserInfo')
        buttonAttUserInfo.value = buttonEditWorker.id
    })
            
    const buttonDismissWorker = document.createElement('button')
    buttonDismissWorker.innerText = 'Demitir'
    buttonDismissWorker.id = x.uuid //ID FUNCIONÁRIO
    
     buttonDismissWorker.addEventListener('click', (event) => {
        openModal('Demitir funcionário?', 'formDismissWorker')
        dismissWorker.value = buttonDismissWorker.id
    })

    divButtons.append(buttonEditWorker, buttonDismissWorker)
    
    workerElement.append(workerName, divWorkInfo, divButtons)
    
    workersList.appendChild(workerElement)
}

export async function renderWorkers(departmentUUID){
    workersList.innerHTML = ''
    const data = await Api.getWorkers()

    data.data.forEach(x => {
        if(departmentUUID.includes(x.department_uuid) || departmentUUID == 2 && departments.includes(x.department_uuid)){
            creatingWorker(x)
        }
    })
}

function renderCompanyElements(x){
    const companyListElement = document.createElement('li')
    companyListElement.innerText = x.name
    companyListElement.id = x.uuid
               
    const opening_hours = document.createElement('span')
    opening_hours.innerText = x.opening_hours
    companyListElement.appendChild(opening_hours)
    opening_hours.style.display = 'none'
            
    companyListElement.addEventListener('click', (event) => {
        renderCompanyInfo(companyListElement)
        openDeleteDepartment.value = 2
        editDepartment.value = 2
        hireWorker.value = 2
        description.innerText = ''
    })
                
    companyList.appendChild(companyListElement)
}

async function renderCompanies(filter){
    const data = await Api.getCompaniesHome()

    if(filter != undefined){
        companyList.innerHTML = ''
        data.data.forEach(x => {
            if(x.sectors.uuid == filter){
                renderCompanyElements(x)
            }
        })

    }else if(filter == undefined){
        data.data.forEach(x => {
            renderCompanyElements(x)
        })
    }

    if(filter == 1){
        data.data.forEach(x => {
            renderCompanyElements(x)
        })
    }
}

renderCompanies()


filterSectors.addEventListener('change', (event) => {
    renderCompanies(filterSectors.options[filterSectors.selectedIndex].id)
})

filterDepartments.addEventListener('change', (event) => {
    const depUUID = filterDepartments.options[filterDepartments.selectedIndex].id
    const depDescription = filterDepartments.options[filterDepartments.selectedIndex].value

    description.innerText = depDescription

    openDeleteDepartment.value = depUUID
    editDepartment.value = depUUID

    hireWorker.value = depUUID

    if(depUUID == '2'){
        description.innerText = ''
    }

    renderWorkers(depUUID)
})