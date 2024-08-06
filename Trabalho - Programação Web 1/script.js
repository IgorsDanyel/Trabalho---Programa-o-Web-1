(function () {
    const listItem = document.querySelector('.todo');
    const list = document.querySelector(".list-todo");
    const loading = document.querySelector(".loading");
    const loadingTodo = document.querySelector(".loading-update-todo");
    const loadingBtnAdd = document.querySelector(".loading-btn");
    const icBtnAdd = document.querySelector(".ic-btn-add");

    const inputTitle = document.querySelector('.input_title');
    const inputDesc = document.querySelector('.input_desc');
    const btnAdd = document.querySelector('.btn-add');

    const inputSearch = document.querySelector('#pesquisa');
    const btnSearch = document.querySelector(".btn-search");
    const btnClose = document.querySelector(".btn-close");
    const modal = document.querySelector("dialog");

    (function () {
        getAllToDos();
        configModal();

        btnAdd.onclick = (e) => {
            e.preventDefault();
            addNewToDo();
        }
    })();

    async function addNewToDo() {
        try {
            icBtnAdd.style.visibility = 'hidden';
            loadingBtnAdd.style.display = 'block';
            const mInputTitle = inputTitle.value.trim();
            const mInputDesc = inputDesc.value.trim(); 
            const error = document.querySelector('.error-inputs'); 
            if(mInputDesc ==="" || mInputTitle ===""){
                error.style.display = "block";
                icBtnAdd.style.visibility = 'visible';
                loadingBtnAdd.style.display = 'none';
                return;
            }

            error.style.display = "none";

            const request = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: 1, // Ajuste o userId conforme necessário
                    id: new Date().getTime(), // ID único para a nova tarefa
                    title: mInputTitle,
                    completed: false,
                    description: mInputDesc 
                })
            });

            const todo = await request.json();
            list.prepend(createNewItem(todo));
            inputTitle.value = '';
            inputDesc.value = '';

            icBtnAdd.style.visibility = 'visible';
            loadingBtnAdd.style.display = 'none';

        } catch (error) {
            console.error('Erro:', error);
        }
    }

    async function getAllToDos() {
        try {
            loading.style.display = "block";
            const request = await fetch("https://jsonplaceholder.typicode.com/todos");
            const todos = await request.json();
            list.innerHTML = '';
            if (todos.length > 0) {
                todos.forEach(todo => list.prepend(createNewItem(todo)));
            } else {
                document.querySelector('.no-todos').style.display = "block";
            }
            loading.style.display = "none";
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    function createNewItem(todo) {
        const item = listItem.cloneNode(true);
        const text = item.querySelector('p');
        const completed = item.querySelector('.btn_complet');
        const del = item.querySelector('.btn_delete');
        const edit = item.querySelector('.btn_edit');
        const loadingUpdate = item.querySelector(".loading-update-todo");

        item.id = `item-${todo.id}`;
        text.textContent = `${todo.id} - ${todo.title}`;

        if (todo.completed) {
            item.classList.add("completed-todo");
        } else {
            item.classList.remove("completed-todo");
        }

        completed.onclick = () => updateToDoStatus(todo.id, item, loadingUpdate);
        del.onclick = () => deleteToDo(todo.id);
        edit.onclick = () => editToDo(item, text, todo.id);

        return item;
    }

    async function updateToDoStatus(todoId, item, loading) {
        try {
            loading.style.display = "block";
            const request = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    completed: !item.classList.contains("completed-todo")
                })
            });

            const todo = await request.json();
            item.classList.toggle("completed-todo", todo.completed);
            loading.style.display = "none";
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    async function deleteToDo(todoId) {
        try {
            const userConfirmed = confirm("Are you sure you want to delete this task?");
            if (!userConfirmed) {
                return;
            }
            const request = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
                method: "DELETE"
            });

            if (request.ok) {
                document.getElementById(`item-${todoId}`).remove();
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    async function editToDo(item, text, todoId) {
        const newTitle = prompt("Enter new title", text.textContent.split(' - ')[1]);
        if (newTitle) {
            try {
                const request = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: newTitle
                    })
                });

                const todo = await request.json();
                text.textContent = `${todo.id} - ${todo.title}`;
            } catch (error) {
                console.error('Erro:', error);
            }
        }
    }

    function configModal() {
        btnSearch.onclick = async (e) => {
            e.preventDefault();
            const inputValue = inputSearch.value.trim();
            if (!inputValue) return;

            try {
                const request = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${inputValue}`);
                const todos = await request.json();

                const list = modal.querySelector(".list-result");
                list.innerHTML = '';

                if (todos.length > 0) {
                    todos.forEach(todo => list.prepend(createNewItem(todo)));
                } else {
                    list.innerHTML = '<p>No tasks found for this user</p>';
                }

                modal.showModal();
            } catch (error) {
                console.error('Erro:', error);
            }
        }

        btnClose.onclick = () => modal.close();
    }
})();
