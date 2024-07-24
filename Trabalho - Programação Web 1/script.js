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
                    id: new Date().getTime(), // ID temporário
                    title: mInputTitle,
                    completed: false
                })
            });

            if (!request.ok) {
                throw new Error("Erro ao adicionar tarefa");
            }

            const data = await request.json();
            const newItem = listItem.cloneNode(true);
            newItem.querySelector('p').innerText = `Usuário: ${data.userId} - ${data.title} \n Descrição: ${mInputDesc}`;
            newItem.querySelector('.btn_delete').onclick = (e) => {
                e.preventDefault();
                deleteTodo(data.id);
                newItem.remove();
                if (Array.from(list.querySelectorAll('.todo')).length === 1) {
                    list.querySelector('.no-todos').style.display = "block";
                }
            }
            newItem.querySelector('.btn_complet').onclick = (e) => {
                e.preventDefault();
                updateTodo(data.id, { completed: !data.completed });
                data.completed = !data.completed;
                newItem.classList.toggle("completed-todo");
            }

            newItem.classList.remove('ex');
            list.insertBefore(newItem, list.firstChild);
            icBtnAdd.style.visibility = 'visible';
            loadingBtnAdd.style.display = 'none';

        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
        }
    }

    async function getAllToDos() {
        try {
            const request = await fetch('https://jsonplaceholder.typicode.com/todos');
            if (!request.ok) {
                throw new Error("Erro ao buscar tarefas");
            }
            const data = await request.json();
            list.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

            data.forEach(mItem => {
                const newItem = listItem.cloneNode(true);
                newItem.querySelector('p').innerText = `Usuário: ${mItem.userId} - ${mItem.title} \n Descrição: Nenhuma`;
                newItem.querySelector('.btn_delete').onclick = (e) => {
                    e.preventDefault();
                    deleteTodo(mItem.id);
                    newItem.remove();
                    if (Array.from(list.querySelectorAll('.todo')).length === 1) {
                        list.querySelector('.no-todos').style.display = "block";
                    }
                }
                newItem.querySelector('.btn_complet').onclick = (e) => {
                    e.preventDefault();
                    updateTodo(mItem.id, { completed: !mItem.completed });
                    mItem.completed = !mItem.completed;
                    newItem.classList.toggle("completed-todo");
                }

                newItem.classList.remove('ex');
                list.appendChild(newItem);
            });

            if (Array.from(list.querySelectorAll('.todo')).length === 0) {
                list.querySelector('.no-todos').style.display = "block";
            }
            loading.style.display = "none";
        } catch (error) {
            console.error('Erro no fetch:', error);
        }
    }

    function configModal() {
        btnSearch.onclick = (e) => {
            const id = Number(inputSearch.value.trim());
            if (isNaN(id) || id <= 0 || id > 200) {
                document.querySelector('.search-input-container').classList.add('search-input-container-error');
                return;
            }
            getAllToDosOfUser(id);
            modal.showModal();
        }

        btnClose.onclick = () => {
            modal.close();
        }

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.close();
            }
        }
    }

    async function updateTodo(id, body) {
        try {
            loadingTodo.style.display = "block";
            const request = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (!request.ok) {
                throw new Error("Erro ao atualizar tarefa");
            }
            await request.json();
            loadingTodo.style.display = "none";
        } catch (e) {
            console.error('Erro ao atualizar tarefa:', e);
        }
    }

    async function getAllToDosOfUser(userId) {
        try {
            const listResult = document.querySelector('.list-result');
            const loadingResult = document.querySelector('.loading-result');
            loadingResult.style.display = "block";

            const request = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
            if (!request.ok) {
                throw new Error("Erro ao buscar tarefas do usuário");
            }
            const data = await request.json();
            listResult.innerHTML = '';

            data.forEach(mItem => {
                const newItem = listItem.cloneNode(true);
                newItem.querySelector('p').innerText = `Usuário: ${mItem.userId} - ${mItem.title} \n Descrição: Nenhuma`;
                newItem.querySelector('.btn_delete').onclick = (e) => {
                    e.preventDefault();
                    deleteTodo(mItem.id);
                    newItem.remove();
                    if (Array.from(listResult.querySelectorAll('.todo')).length === 1) {
                        listResult.querySelector('.no-todos').style.display = "block";
                    }
                }
                newItem.querySelector('.btn_complet').onclick = (e) => {
                    e.preventDefault();
                    updateTodo(mItem.id, { completed: !mItem.completed });
                    mItem.completed = !mItem.completed;
                    newItem.classList.toggle("completed-todo");
                }

                newItem.classList.remove('ex');
                listResult.appendChild(newItem);
            });

            if (Array.from(listResult.querySelectorAll('.todo')).length === 0) {
                listResult.querySelector('.no-todos').style.display = "block";
            }
            loadingResult.style.display = "none";
        } catch (error) {
            console.error('Erro ao buscar tarefas do usuário:', error);
        }
    }

    async function deleteTodo(id) {
        try {
            const request = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "DELETE",
            });

            if (!request.ok) {
                throw new Error("Erro ao deletar tarefa");
            }
            await request.json();
        } catch (e) {
            console.error('Erro ao deletar tarefa:', e);
        }
    }
})();


