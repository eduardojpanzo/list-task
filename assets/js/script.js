let userActive,listActive;

document.querySelector(".home #logIn").addEventListener('click',(e)=>{
    e.preventDefault();

    if (userActive) {
        const password = document.querySelector('.home #password').value;
        confirmUser(userActive,password);
    }
});

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
    console.log('não confirmaado \n ERROR');
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
    const userListTask = AllListTask.filter(list=>list.userRef===userId);
    lists.innerHTML = ``;

    userListTask.map(userList=>{
        const listItem = modelsArea.querySelector('.list').cloneNode(true);

        listItem.querySelector('.list--name').innerHTML = userList.title;
        listItem.querySelector('.list--numberTask')
            .innerHTML = userList.tasks.length;
        
        listItem.addEventListener('click',(e)=>{
            handletasks(userList.title,userList.tasks)
        });

        lists.append(listItem);
    });

}

function goToHome(){
    listsTask.style.display = 'none';
    home.style.display = 'flex';
}
function goback(){
    tasksTamplete.style.display = 'none';
    listsTask.style.display = 'block';
}

function onAddList() {
    const titleList = getNewData().trim();

    if (titleList) {
        const newList = new CreateListTasks(titleList);
        AllListTask.push(newList);
        hideModal();

        updateList();
    }
}

function getNewData() {
    return modalInput.querySelector('input').value
}

function updateList() {
    //LocalStorge
    assembleList(userActive.id);
}

function showModal() {
    modalInput.style.display = 'flex';
}
function hideModal() {
    modalInput.style.display = 'none';
}

//Da tarefa escolhida ter os feitos e não feiots
function handletasks(title,tasks) {
    listsTask.style.display = 'none';
    tasksTamplete.style.display = 'block';
    
    tasksTamplete.querySelector('.tasks-body').innerHTML='';
    tasksTamplete.querySelector('.tasks--name')
        .innerHTML = title;
    
    tasks.map(task=>{
        const taskItem = modelsArea.querySelector('.task').cloneNode(true);
        const classAdicional = task.status?`task-done`:`task-to-do`;
        
        taskItem.classList.add(classAdicional)
        
        taskItem.querySelector('.task--name')
            .innerHTML = task.name;
        taskItem.querySelector('.task--status')
            .innerHTML = task.status?`V`:`O`;
        
        taskItem.addEventListener('click',(e)=>{
            //makeTaskDone()
            //trocar a tarefa de paraFazer à Feito e viceVersa
        });

        tasksTamplete.querySelector('.tasks-body')
            .append(taskItem);
    });
}
