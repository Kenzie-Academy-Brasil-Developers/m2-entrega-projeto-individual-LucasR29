import { Api } from "./requisitions.js"
import { Notification } from "./toasty.js"

const buttonCreateCompany = document.getElementById('buttonCreateCompany')
const sectorSelect = document.getElementById('sectorSelect')
const filterCompanies = document.getElementById('filterCompanies')
const modalTitle = document.getElementById('modalTitle')
const openCreateCompany = document.getElementById('createCompany')
const formList = document.querySelectorAll('.forms')
const modal = document.getElementById('modalAttInfo')

openCreateCompany.addEventListener('click', (event) => {
    modal.style.display = 'flex'
    formList.forEach(x => {
        if(x.id != 'formCreateCompany'){
            x.style.display = 'none'
        }else{
            x.style.display = 'flex'
        }
    })
})

async function getSectorsUUID(){
    const data = await Api.getSectors()
    data.data.forEach(x => {
        const filterOptions = document.createElement('option')
        filterOptions.innerText = x.description
        filterOptions.id = x.uuid
        const selectOption = document.createElement('option')
        selectOption.innerText = x.description
        selectOption.id = x.uuid

        sectorSelect.appendChild(selectOption)
        filterCompanies.appendChild(filterOptions)
    })
}

getSectorsUUID()

async function createCompany(){
    const companyInfo = document.querySelectorAll('.newCompanyInfo')

    const sectorUUID = sectorSelect.options[sectorSelect.selectedIndex].id
    
    const obj = {
        name : companyInfo[0].value,
        opening_hours : companyInfo[1].value,
        description : companyInfo[2].value,
        sector_uuid : sectorUUID
    }
    await  Api.createCompany(obj)
}

buttonCreateCompany.addEventListener('click', async (event) => {
    event.preventDefault()
    modalTitle.innerText = 'Informe os dados da empresa'
    createCompany()
})