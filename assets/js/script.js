//Selecionar e montar um user
//Escolha de um usúario e  ative depois da escolha
function enableUser(user){
    userActive = user;

    home.querySelector('.user-img img').src = `${userActive.urlImg}`;
    home.querySelector('.user--name').innerHTML = `${userActive.name}`;
}

//Validar a Entrada no password....
function confirmUser(user,password) {
    if(passwordComfirmed(user, password)){
        handleUserList(user)
        return;
    }
    showPassword();
}

function passwordComfirmed(user,password) {
    return user.password === password;
}

//A partir do login ir na segundo pagina 'lists'
function handleUserList(user) {
    
    home.style.display = 'none';
    listsTask.style.display = 'block';
    
    listsTask.querySelector('.user--img img').src = user.urlImg;
    listsTask.querySelector('.user--name').innerHTML = user.name;
    
    assembleList(user.id)
}
//Carregar enumeras tarefas apartir do usuario escolhido

function assembleList(userId) {
    lists.innerHTML = ``;
    AllListTask.filter(list=>list.userRef===userId)
        .map(userList=>{
            const listItem = modelsArea.querySelector('.list').cloneNode(true);

            listItem.querySelector('.list--name').innerHTML = userList.title;
            listItem.querySelector('.list--numberTask')
                .innerHTML = userList.tasks.length;
            
            listItem.addEventListener('click',(e)=>{
                listActive = userList;
                handleTasks(listActive)
            });

            lists.append(listItem);
        });

}

function showPassword() {
    passwordView.style.opacity = '1';
    passwordView.innerHTML = `A senha é: ${userActive.password}`;
}

function goToHome(){
    listsTask.style.display = 'none';
    home.style.display = 'flex';
}
function goToList(){
    tasksTamplete.style.display = 'none';
    listsTask.style.display = 'block';

    updateList()
}

function goToTasks() {
    listsTask.style.display = 'none';
    tasksTamplete.style.display = 'block';

    updateTasks();
}

function getNewData() {
    return modalInput.querySelector('input').value
}

function updateList() {
    localStorage.setItem('allLists',JSON.stringify(AllListTask));
    assembleList(userActive.id);
}

function showModal() {
    modalInput.style.display = 'flex';
}
function hideModal() {
    modalInput.style.display = 'none';
    modalInput.querySelector('input').value = '';
}

//Da tarefa escolhida ter os feitos e não feiots
function handleTasks({title,tasks}) {
    goToTasks()

    tasksTamplete.querySelector('.tasks--name')
        .innerHTML = title;
    
    assembleTasks(tasks)
}

function assembleTasks(tasks) {
    tasksTamplete.querySelector('.tasks-body').innerHTML='';
    
    tasks.map(task=>{
        const taskItem = modelsArea.querySelector('.task').cloneNode(true);
        const classAdicional = task.status?`task-done`:`task-to-do`;
        
        taskItem.classList.add(classAdicional)
        
        taskItem.querySelector('.task--name')
            .innerHTML = task.name;
        taskItem.querySelector('.task--status')
            .innerHTML = task.status?`V`:`O`;
        
        taskItem.addEventListener('click',(e)=>{
            makeTaskDone(task)
            //trocar a tarefa de paraFazer à Feito e viceVersa
        });

        tasksTamplete.querySelector('.tasks-body')
            .append(taskItem);
    });
}

function makeTaskDone(task) {
    task.status = !task.status;

    updateTasks();
}

function updateTasks() {
    assembleTasks(listActive.tasks);
}

function onAdd(typeItem) {
    showModal();
    typeToAdd = typeItem;
}