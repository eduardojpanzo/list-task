const select = document.querySelector('#accountType');
const home = document.querySelector('.home.container');
const passwordInput = document.querySelector('.user-selected #password');
const passwordView = document.querySelector('.user-selected .passwordView');
const buttonLogin = document.querySelector(".home #logIn");

const listsTask = document.querySelector('.listsTask.container')
const lists = listsTask.querySelector('.lists-body .lists');

const tasksTamplete = document.querySelector('.tasks.container');

const modalInput = document.querySelector('.modalInput');
const modelsArea = document.querySelector('.modelsArea');

const users = [
    {id:1,name:'Jordam Machael',password:'JM1',urlImg:'.../../media/homem.png'},
    {id:2,name:'Miguel Eduardo',password:'ME2',urlImg:'.../../media/homem1.png'},
    {id:3,name:'Pedro Anfré',password:'PA3',urlImg:'.../../media/homem2.png'},
    {id:4,name:'Nami Helena',password:'NH4',urlImg:'.../../media/mulher1.png'},
    {id:5,name:'Carolina Maria',password:'CM5',urlImg:'.../../media/mulher2.png'}
];
let AllListTask = localStorage.getItem('allLists')?
    JSON.parse(localStorage.getItem('allLists')):[];

let userActive,listActive,typeToAdd;

function goToHome(){
    listsTask.style.display = 'none';
    home.style.display = 'flex';
}

function mountUsersIntoSelect() {
    users.map(user=>{
        const userOption = document.createElement('option');
        userOption.setAttribute('value',user.id);
        userOption.innerHTML = user.name;
    
        select.append(userOption)
    })
}

function enableUser(user){
    userActive = user;
    mountUserActive(userActive);
}

function mountUserActive(user) {
    home.querySelector('.user-img img').src = `${user.urlImg}`;
    home.querySelector('.user--name').innerHTML = `${user.name}`;

    listsTask.querySelector('.user--img img').src = user.urlImg;
    listsTask.querySelector('.user--name').innerHTML = user.name;
}

//Validar a Entrada no password....
function confirmUser(user,password) {
    if(user.password === password){
        goToList(user)
        return;
    }
    showPassword();
}
//A partir do login ir na segundo pagina 'lists'
function goToList(){
    home.style.display = 'none';
    tasksTamplete.style.display = 'none';
    listsTask.style.display = 'block';

    updateList()
}

function showPassword() {
    passwordView.innerHTML = `A senha é: ${userActive.password}`;
    passwordView.style.opacity = '1';
}

function updateList() {
    localStorage.setItem('allLists',JSON.stringify(AllListTask));
    assembleList(userActive.id);
}

//Carregar a coleção de tarefas do usuario Activo
function assembleList(userId) {
    lists.innerHTML = ``;
    
    AllListTask.filter(list=>list.userRef===userId)
        .map(userList=>{
            const listItem = modelsArea.querySelector('.list').cloneNode(true);

            listItem.querySelector('.list--name').innerHTML = userList.title;
            listItem.querySelector('.list--numberTask')
                .innerHTML = userList.tasks.length;
            
            listItem.addEventListener('click',(e)=>{
                if(e.target.tagName==='BUTTON'){
                    removeList(userList);
                    return;
                }
                listActive = userList;
                goToTasks(listActive)
            });

            lists.append(listItem);
        });
}

function removeList(userList) {
    AllListTask = AllListTask.filter(list=>list.id !== userList.id);
    
    updateList();
}

function goToTasks({title,tasks}) {
    listsTask.style.display = 'none';
    tasksTamplete.style.display = 'block';

    tasksTamplete.querySelector('.tasks--name')
        .innerHTML = title;

    assembleTasks(tasks);
}


function assembleTasks(tasks) {
    tasksTamplete.querySelector('.tasks-body').innerHTML='';
    
    tasks.map(task=>{
        const taskItem = modelsArea.querySelector('.task').cloneNode(true);
        
        taskItem.classList.add(task.status?`task-done`:`task-to-do`)
        
        taskItem.querySelector('.task--name')
            .innerHTML = task.name;
        taskItem.querySelector('.task--status')
            .innerHTML = task.status?`✔`:`⚫`;
        
        taskItem.addEventListener('click',(e)=>{
            /* Futuramente...
            if(e.target.tagName==='BUTTON'){
                removeTask(tasks,task)
                return;
            } 
            */
            
            //trocar a tarefa de paraFazer à Feito e viceVersa
            makeTaskDone(task)
        });

        tasksTamplete.querySelector('.tasks-body')
            .append(taskItem);
    });
}

/*futuramente
function removeTask(tasks,task) {
    tasks.filter(({id})=> id !== task.id);

    assembleTasks(listActive.tasks);
} */

function makeTaskDone(task) {
    task.status = !task.status;

    assembleTasks(listActive.tasks)
}