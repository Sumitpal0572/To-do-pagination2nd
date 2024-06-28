document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://jsonplaceholder.typicode.com/todos';
    const TODOS_PER_PAGE = 6;
    let currentPage = 1;

    // Fetch Todos and Update DOM
    const fetchTodos = async (page) => {
        try {
            const response = await fetch(`${API_URL}?_page=${page}&_limit=${TODOS_PER_PAGE}`);
            const data = await response.json();
            renderTodos(data);
            renderPaginationButtons(page);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    // Render Todos
    const renderTodos = (todos) => {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.classList.add('todo-item');
            li.textContent = todo.title;
            todoList.appendChild(li);
        });
    };

    // Render Pagination Buttons
    const renderPaginationButtons = (page) => {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = page === 1;
        prevButton.addEventListener('click', () => {
            currentPage--;
            fetchTodos(currentPage);
        });

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            currentPage++;
            fetchTodos(currentPage);
        });

        pagination.appendChild(prevButton);
        pagination.appendChild(nextButton);
    };

    // Initial Fetch
    fetchTodos(currentPage);
});