# Trabalho---Programa-o-Web-1
Grupo: Igor Danyel Silva Santos, Kauã Renato da Silva Caiana, Aslan Gabriel Satírio
dos Santos, Jhonnas Davi da Silva Santos e Patrick Murilo da Silva
Descrição
Este projeto é uma aplicação web para gerenciamento de tarefas que permite aos usuários
adicionar, visualizar, editar e excluir tarefas. A aplicação utiliza a API JSONPlaceholder para
realizar operações CRUD e possui uma interface intuitiva e responsiva.
Funcionalidades
● Adicionar Tarefas: Permite adicionar novas tarefas com título e descrição.
● Visualizar Tarefas: Exibe todas as tarefas adicionadas.
● Editar Tarefas: Modifique o título e a descrição das tarefas existentes.
● Excluir Tarefas: Remova tarefas da lista.
● Buscar Tarefas por Usuário: Pesquise e visualize tarefas associadas a um usuário
específico.
Como Usar
1. Acessando o Site
Abra o arquivo index.html em seu navegador para acessar a aplicação. Você pode fazer
isso arrastando o arquivo para uma janela do navegador ou abrindo-o diretamente através
do menu "Abrir arquivo".
2. Adicionar Tarefas
1. Preencha os Campos:
○ No formulário na parte superior da página, insira o título da tarefa no campo
"Escreva um título".
○ Insira uma descrição da tarefa no campo "Escreva uma descrição (opcional)".
2. Adicionar Tarefa:
○ Clique no botão "Adicionar" (ícone de mais) para salvar a nova tarefa.
3. Confirmar Adição:
○ A tarefa será adicionada à lista exibida na página principal. Se os campos
estiverem vazios, será exibida uma mensagem de erro pedindo para
preencher ambos os campos.

3. Visualizar Tarefas
● Tarefas na Lista Principal:
○ Todas as tarefas adicionadas serão exibidas na seção "Lista de Tarefas".
○ Cada tarefa inclui um título, uma descrição (se fornecida) e ícones para
completar e excluir a tarefa.

4. Editar Tarefas
1. Selecionar Tarefa:
○ Clique no ícone de lápis (se estiver disponível) ao lado da tarefa que deseja
editar.
2. Editar Tarefa:
○ Um prompt aparecerá solicitando que você insira o novo título e a nova
descrição.
○ Após inserir as informações, clique em "Salvar" para atualizar a tarefa.

5. Excluir Tarefas
1. Selecionar Tarefa:
○ Clique no ícone de lixeira ao lado da tarefa que deseja excluir.
2. Confirmar Exclusão:
○ A tarefa será removida da lista imediatamente.

6. Buscar Tarefas por Usuário
1. Abrir Modal de Pesquisa:
○ Insira o ID do usuário (entre 1 e 200) no campo de pesquisa na parte
superior da página.
2. Buscar Tarefas:
○ Clique no botão de pesquisa (ícone de lupa) para abrir um modal com as
tarefas do usuário especificado.

3. Visualizar Resultados:
○ As tarefas do usuário serão exibidas no modal. Feche o modal clicando no
ícone de fechar ou fora do modal.

7. Mensagens e Erros
● Mensagem de Erro ao Adicionar Tarefas:
○ Se os campos de título ou descrição estiverem vazios, será exibida uma
mensagem de erro solicitando o preenchimento dos campos.

● Mensagem de Nenhuma Tarefa:
○ Se não houver tarefas na lista, uma mensagem "Sem tarefas" será exibida.

Como Funciona

● Adição de Tarefas: Quando uma tarefa é adicionada, os dados são enviados para a
API JSONPlaceholder, e a tarefa é exibida na lista.
● Visualização de Tarefas: As tarefas são carregadas da API e exibidas na lista
principal.
● Edição de Tarefas: O título e a descrição da tarefa são atualizados via API.
● Exclusão de Tarefas: A tarefa é removida da API e da lista.
● Busca por Usuário: As tarefas de um usuário específico são carregadas da API e
exibidas em um modal.
