const taksList = document.getElementById('task-list')
const defaultText = document.getElementById('default-text')
const form = document.getElementById('form')
const navbar = document.getElementById('navbar')
const taskInput = document.getElementById('task-input')
const addBtn = document.getElementById('add-btn')

class Task{
    constructor(task){
        this.name = task
    }
}

class Layout{

    addTask(task){

        if(task.name.trim() === ''){
            this.showMessage('Escribe una tarea', 'warning')
            return
        }

        const cardTask = document.createElement('div')
        cardTask.classList = 'list__item'
        cardTask.innerHTML = `
        <div class="list__first-section">
            <div class="list__checkbox">
                <input class="checkbox checkbox-default" type="checkbox" id="checkbox">
                <span class="checkbox checkbox-box fas" id="span"></span>
            </div>
            <p class="list__text">${task.name}</p>
        </div>
        <i class="list__remove list__remove fas fa-trash-alt" id="remove"></i>
        `
        
        taksList.appendChild(cardTask)

        this.showMessage('Tarea Agregada', 'success')

        if(taksList.children.length > 0){
            defaultText.innerHTML = ''
        }

    }
    removeTask(element){

        if(element.id === 'remove'){
            element.parentElement.remove()

            this.showMessage('Tarea Eliminada', 'danger')

            if(taksList.children.length === 0){
                defaultText.innerHTML = 'Agregar tareas...'
            }
        }
    }
    resetForm(){
        form.reset()
    }
    showMessage(message, status){

        const alert = document.createElement('div')
        alert.classList = `alert alert-${status}`
        alert.innerHTML = `${message}`

        navbar.appendChild(alert)

        setTimeout(function(){
            alert.remove()  
        }, 2500)
    }
    completeTask(element){
        if(element.id === 'checkbox'){
            element.parentElement.nextSibling.nextSibling.classList.toggle('line')
            element.nextSibling.nextSibling.classList.toggle('checkbox-box')
            element.nextSibling.nextSibling.classList.toggle('checkbox-check')
        }
    }
}

addBtn.addEventListener('click', function(){

    const layout = new Layout()
    const task = new Task(taskInput.value)

    layout.addTask(task)
    layout.resetForm()
    taskInput.focus()
})

form.addEventListener('submit', function(e){

    const layout = new Layout()
    const task = new Task(taskInput.value)

    layout.addTask(task)
    layout.resetForm()
    taskInput.focus()
    
    e.preventDefault()
})

taksList.addEventListener('click', function(e){
    const layout = new Layout()
    layout.removeTask(e.target)
    layout.completeTask(e.target)
})