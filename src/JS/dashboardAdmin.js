import { Api } from "./requisitions.js"

const companyList = document.getElementById('menu')
const filterSectors = document.getElementById('filterCompanies')
const filterDepartments = document.getElementById('selectDepartment')
const description = document.getElementById('description')
const workersList = document.getElementById('workers')
const deleteDepartment = document.getElementById('deleteDepartment')
const editDepartment = document.getElementById('edit')
const hireWorker = document.getElementById('hire')



async function renderCompanyInfo(HTMLelement){
    filterDepartments.innerHTML = ''
    const departments = []
    
    const fixedOption = document.createElement('option')
    fixedOption.innerText = 'Todos'
    fixedOption.id = 2
    filterDepartments.appendChild(fixedOption)
    
    const data = await Api.getCompanyDepartments(HTMLelement.id)
    
    const companyName = document.querySelector('.companyInfo__name')
    companyName.innerText = HTMLelement.innerText//NOME EMPRESA
    //companyName.id = HTMLelement.id //ID DA EMPRESA 

    const company_hours = document.getElementById('companyInfo__hours')
    company_hours.innerText = 'Abre às: ' + HTMLelement.firstElementChild.innerText

    const createDepartment = document.getElementById('createDepartment')
    createDepartment.value = HTMLelement.id
    
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

async function renderWorkers(departmentUUID){
    workersList.innerHTML = ''
    const data = await Api.getWorkers()
    console.log(data)
    
    data.data.forEach(x => {
        if(departmentUUID.includes(x.department_uuid) || departmentUUID == 2 && x.department_uuid != null){
            const workerElement = document.createElement('li')
            workerElement.id = x.department_uuid
    
            const workerName = document.createElement('p')
            workerName.innerText = x.username
    
            const workerKindOfWork = document.createElement('span')
            workerKindOfWork.innerText = x.kind_of_work
    
            const divButtons = document.createElement('div')
            divButtons.classList.add('buttonsEditWorker')
    
            const buttonEditWorker = document.createElement('button')
            buttonEditWorker.innerText = 'Editar'
            buttonEditWorker.id = x.uuid //ID FUNCIONÁRIO
            buttonEditWorker.value = x.department_uuid//ID DEPARTAMENTO
            
            const buttonDeleteWorker = document.createElement('button')
            buttonDeleteWorker.innerText = 'Demitir'
            buttonDeleteWorker.id = x.uuid //ID FUNCIONÁRIO
    
            divButtons.append(buttonEditWorker, buttonDeleteWorker)
    
            workerElement.append(workerName, workerKindOfWork, divButtons)
    
            workersList.appendChild(workerElement)
        }
    })
}

async function renderCompanies(filter){
    const data = await Api.getCompaniesHome()

    console.log(data)
    if(filter != undefined){
        companyList.innerHTML = ''
        data.data.forEach(x => {
            if(x.sectors.uuid == filter){
                const companyListElement = document.createElement('li')
                companyListElement.innerText = x.name
                companyListElement.id = x.uuid
               
                const opening_hours = document.createElement('span')
                opening_hours.innerText = x.opening_hours
                companyListElement.appendChild(opening_hours)
                opening_hours.style.display = 'none'
            
                companyListElement.addEventListener('click', (event) => {
                    renderCompanyInfo(companyListElement)
                    deleteDepartment.value = 2
                    editDepartment.value = 2
                    hireWorker.value = 2
                    description.innerText = ''
                })
                
                companyList.appendChild(companyListElement)
            }
        })

    }else if(filter == undefined){
        data.data.forEach(x => {
            const companyListElement = document.createElement('li')
            companyListElement.innerText = x.name
            companyListElement.id = x.uuid

            const opening_hours = document.createElement('span')
            opening_hours.innerText = x.opening_hours
            companyListElement.appendChild(opening_hours)
            opening_hours.style.display = 'none'

            companyListElement.addEventListener('click', (event) => {
                renderCompanyInfo(companyListElement)
                deleteDepartment.value = 2
                editDepartment.value = 2
                hireWorker.value = 2
                description.innerText = ''
            })

            companyList.appendChild(companyListElement)
        })
    }

    if(filter == 1){
        data.data.forEach(x => {
            const companyListElement = document.createElement('li')
            companyListElement.innerText = x.name
            companyListElement.id = x.uuid
            
            const opening_hours = document.createElement('span')
            opening_hours.innerText = x.opening_hours
            companyListElement.appendChild(opening_hours)
            opening_hours.style.display = 'none'
            
            companyListElement.addEventListener('click', (event) => {
                renderCompanyInfo(companyListElement)
                deleteDepartment.value = 2
                editDepartment.value = 2
                hireWorker.value = 2
                description.innerText = ''
            })

            companyList.appendChild(companyListElement)
        })
    }
}

renderCompanies()


filterSectors.addEventListener('change', (event) => {
    renderCompanies(filterSectors.options[filterSectors.selectedIndex].id)
})

filterDepartments.addEventListener('change', (event) => {
    description.innerText = filterDepartments.options[filterDepartments.selectedIndex].value

    deleteDepartment.value = filterDepartments.options[filterDepartments.selectedIndex].id

    editDepartment.value = filterDepartments.options[filterDepartments.selectedIndex].id

    hireWorker.value = filterDepartments.options[filterDepartments.selectedIndex].id

    if(filterDepartments.options[filterDepartments.selectedIndex].id == '2'){
        description.innerText = ''
    }

    renderWorkers(filterDepartments.options[filterDepartments.selectedIndex].id)
})



