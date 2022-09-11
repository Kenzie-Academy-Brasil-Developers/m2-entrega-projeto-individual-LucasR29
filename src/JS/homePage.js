import { Api } from "./requisitions.js"

const listCompanies = document.getElementById('listCompanies')
const sectorsList = document.getElementById('sectorsList')
const sectors = new Set()
const all = document.getElementById('all')

function filter(sectorName){
    const sector = document.querySelectorAll('.sector')
    sector.forEach(x => {
        if(sectorName != x.innerText){
            x.parentNode.style.display = 'none'
        }else{
            x.parentNode.style.display = 'flex'
        }
    })
}

function showAll(){
    all.addEventListener('click', (event) => {
        const sector = document.querySelectorAll('.sector')
        sector.forEach(x => {
            x.parentNode.style.display = 'flex'
        })
    })
}

async function renderCompanies(){
    const data = await Api.getCompaniesHome()
    data.data.forEach(x => {
        sectors.add(x.sectors.description)

        const company = document.createElement('li')
        company.classList.add('company')

        const companyName = document.createElement('h2')
        companyName.innerText = x.name

        const companySector = document.createElement('p')
        companySector.classList.add('sector')
        companySector.innerText = x.sectors.description

        company.append(companyName,companySector)

        listCompanies.appendChild(company)
    })

    sectors.forEach(x => {
        const sectorsListElement = document.createElement('li')
        sectorsListElement.innerText = x
        sectorsListElement.addEventListener('click', (event) => {
            filter(x)
        })

        sectorsList.appendChild(sectorsListElement)
    })
}

renderCompanies()
showAll()