let userActive;

function enableUser(){
    userActive = users[1];
}


//Validar a Entrada no password....
function handleUser(user) {
    document.querySelector('.home .user-img img').src = `${user.urlImg}`;
    document.querySelector('.home .user--name').innerHTML = `${user.name}`;
    
}

function confirmUser(user) {
    if(passwordComfirmed(user.password)){
        handleUserList(user)
    }
}

function passwordComfirmed(user,password) {
    return user.password === password;
}
//A partir do login ir na segundo pagina 'lists'
//Carregar enumeras tarefas apartir do usuario escolhido
//Da tarefa escolhida ter os feitos e não feiots
