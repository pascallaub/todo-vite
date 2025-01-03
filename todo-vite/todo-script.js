const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const todoInfo = document.getElementById('todo-info');

let todos = [];

loadTodos();
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const taskText = input.value.trim();
    if (taskText === '') return;
    
    const todo = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    todos.push(todo);
    saveTodos();
    input.value = '';
    renderTodos();
});

function renderTodos() {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        });
        
        const span = document.createElement('span');
        span.textContent = todo.text;
        if (todo.completed) {
            span.style.textDecoration = 'line-through';
        }

        span.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = todo.text;
            input.classList.add('todo-edit-input');
            span.replaceWith(input);

            input.addEventListener('blur', () => {
                const newText = input.value.trim();
                if (newText !== '') {
                    todo.text = newText;
                    saveTodos();
                }
                renderTodos();
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    input.blur();
                }
            });

            input.focus();
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Löschen';
        deleteButton.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos();
            renderTodos();
        });
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton)
        todoList.appendChild(li);
    });

    todoCounter();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    document.addEventListener('DOMContentLoaded', () => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            todos = JSON.parse(storedTodos);
            renderTodos();
        }
    });
}

function todoCounter() {
    const openTodos = todos.filter(todo => !todo.completed).length;
    todoInfo.textContent = `${openTodos} offene Aufgaben!`;
}