mountUsersIntoSelect();

select.addEventListener('input',(e)=>{
    const userId = Number(e.target.value)
    const user = users.filter(user=>user.id === userId)[0];

    enableUser(user);
})

buttonLogin.addEventListener('click',(e)=>{
    e.preventDefault();

    if (userActive) {
        const password = passwordInput.value;
        confirmUser(userActive,password);
    }
});

passwordInput.addEventListener('input',()=>passwordView.style.opacity = '0');


modalInput.querySelector('a')
    .addEventListener('click',e=>{
        e.preventDefault();
        const itemText = getNewData().trim();

        if (itemText) {
            if (typeToAdd === 'list') {
                allListTask.push(new CreateListTasks(itemText));
                updateList();
            } 
            if(typeToAdd === 'tasks') {
                listActive.tasks.push(new CreateTasks(itemText));
                assembleTasks(listActive.tasks);
            }
            
            hideModal();
        }
});

modalInput.addEventListener('click',(event)=>{
    if (modalInput === event.target) {
       hideModal(); 
    }
})

function getNewData() {
    return modalInput.querySelector('input').value
}

function onAdd(typeItem) {
    showModal();
    typeToAdd = typeItem;
}

//Modal Events function
function showModal() {
    modalInput.style.display = 'flex';
}
function hideModal() {
    modalInput.style.display = 'none';
    modalInput.querySelector('input').value = '';
}