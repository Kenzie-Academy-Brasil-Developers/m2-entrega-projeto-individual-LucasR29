import { Notification } from "./toasty.js"
import { Api } from "./requisitions.js"

const buttonEdit = document.getElementById('edit')
const formList = document.querySelectorAll('.forms')
const modal = document.getElementById('modalAttInfo')
const attButton = document.getElementById('attDepartment')

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
        }
    })
})

async function editDepartment(){
    const newDescription = document.getElementById('newDepartmentDescription')
    const obj = {
        description: newDescription.value
    }
    await Api.editDepartments(obj, buttonEdit.value)
}

attButton.addEventListener('click', (event) => {
    event.preventDefault()
    editDepartment()
})