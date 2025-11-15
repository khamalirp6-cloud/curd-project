document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');


    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    renderTodos();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const task = input.value.trim();
        if(task) {
        todos.push({ id: Date.now(), task: task });
            saveTodos();
            renderTodos();
            input.value = '';
        }
    });

    function renderTodos() {
        list.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.dataset.id = todo.id;

            const span = document.createElement('span');
            span.textContent = todo.task;

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit-btn');
            editBtn.addEventListener('click', () => editTodo(todo.id));

            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.addEventListener('click', () => deleteTodo(todo.id));

            li.appendChild(span);
            li.appendChild(editBtn);
            li.appendChild(delBtn);
            list.appendChild(li);
        });
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    }

    function editTodo(id) {
        const todo = todos.find(t => t.id === id);
        const newTask = prompt('Edit your task:', todo.task);
        if(newTask !== null) {
            todo.task = newTask.trim() ? newTask.trim() : todo.task;
            saveTodos();
            renderTodos();
        }
    }
});
