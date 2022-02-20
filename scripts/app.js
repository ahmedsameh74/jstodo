const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
let todoList = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')): [];

localStorage.setItem('todo', JSON.stringify(todoList))
let todos = JSON.parse(localStorage.getItem('todo'));

//add todo

const generateTodo = (todo) => {
    document.querySelector('ul').innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="fa-solid fa-trash-can delete"></i>
        </li>
    `
}
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if(todo === ''){
        addForm.querySelector('.failed').classList.remove('d-none');
    } else{
        addForm.querySelector('.failed').classList.add('d-none');
        todoList.push(todo)
        localStorage.setItem('todo', JSON.stringify(todoList))
        generateTodo(todo);
        addForm.reset();
    }
    
})
todos.forEach(todo => {
    generateTodo(todo);
    // console.log(todo)
})

//delete todo
list.addEventListener('click' ,e => {
   if(e.target.classList.contains('delete')){
       e.target.parentElement.remove();
       todoList = todoList.filter(todo => todo !== e.target.parentElement.innerText.trim());
       localStorage.setItem('todo', JSON.stringify(todoList));
   }
})

//search todo
const filtered =(searched) => {
    Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(searched))
    .forEach((todo) => todo.classList.add('d-none'));

    Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(searched))
    .forEach((todo) => todo.classList.remove('d-none'));
}
search.addEventListener('keyup', () => {
    const searched = search.value.trim().toLowerCase();
    filtered(searched)
})
