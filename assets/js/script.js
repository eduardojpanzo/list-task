let userActive;

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
    const userListTask = listTask.filter(list=>list.userRef===userId);
    lists.innerHTML = ``;

    userListTask.map(userList=>{
        const listItem = modelList.cloneNode(true);

        listItem.querySelector('.list--name').innerHTML = userList.title;
        listItem.querySelector('.list--numberTask')
            .innerHTML = userList.tasks.length;
        
        listItem.addEventListener('click',(e)=>{
            handletasks(userList.title,userList.tasks)
        });

        lists.append(listItem);
    });

}

//Da tarefa escolhida ter os feitos e não feiots
function handletasks(title,tasks) {
    listsTask.style.display = 'none';
    tasksTamplete.style.display = 'block';
    
    console.log('tasks');
    console.log(title+ '  '+tasks);
}
