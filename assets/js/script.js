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

    document.querySelector('.home .user-img img').src = `${userActive.urlImg}`;
    document.querySelector('.home .user--name').innerHTML = `${userActive.name}`;
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
    console.log('ir para as tarefas... do ' + user.name);

    home.style.display = 'none';
    lists.style.display = 'block';
}

//Carregar enumeras tarefas apartir do usuario escolhido
//Da tarefa escolhida ter os feitos e não feiots
