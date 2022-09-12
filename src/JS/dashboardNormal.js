import { Notification } from "./toasty.js";
import { Api } from "./requisitions.js";


const companyWorkers = document.getElementById('company')
const workers = await Api.coworkers()
const departments = await Api.getDepartments()

function renderDepartments(departments){
    companyWorkers.innerHTML = ''
    
    departments.data.departments.forEach(x => {
        const departmentElement = document.createElement('li')

        const departmentName = document.createElement('p')
        departmentName.innerText = x.name
        const departmentDescription = document.createElement('span')
        departmentDescription.innerText = x.description

        departmentElement.append(departmentName, departmentDescription)

        companyWorkers.appendChild(departmentElement)
    })
}

function createListHeader(departments, workers){
    

    const companyListTitle = document.createElement('li')
    companyListTitle.id = 'titleCompanyWorkers'
    const companyName = document.createElement('h2')
    companyName.innerText = departments.data.name
    const openingHours = document.createElement('span')
    openingHours.innerText = `Abre às: ${departments.data.opening_hours}`

    companyListTitle.append(companyName, openingHours)

    companyWorkers.appendChild(companyListTitle)

    const companyDescriptionElement = document.createElement('li')
    companyDescriptionElement.id = 'description'
    const companyDescription = document.createElement('span')
    companyDescription.innerText = `Funcionários ${workers.data[0].name} ${departments.data.name}`

    companyDescriptionElement.appendChild(companyDescription)

    companyWorkers.appendChild(companyDescriptionElement)

}

function createCompanyWorkers(workers,departments){
    companyWorkers.innerHTML = ''

    createListHeader(departments, workers)

    workers.data[0].users.forEach(x => {
        if(x.is_admin === false){
            const worker = document.createElement('li')
    
            const workerUsername = document.createElement('p')
            workerUsername.innerText = x.username
            const workerKindOfWork = document.createElement('span')
            workerKindOfWork.innerText = x.kind_of_work
            const workerLevel = document.createElement('p')
            workerLevel.innerText = x.professional_level

            worker.append(workerUsername, workerKindOfWork, workerLevel)
            companyWorkers.appendChild(worker)
        }
    })
}


function renderCompanyWorkers(worker, department){
    const listDepartments = document.getElementById('listDepartments')
    const listWorkers = document.getElementById('listWorkers')

    createCompanyWorkers(workers,departments)

    listDepartments.addEventListener('click', (event) => {
        renderDepartments(departments)
    })
    listWorkers.addEventListener('click', (event) => {
        renderCompanyWorkers()
    })    
}

renderCompanyWorkers(workers, departments)