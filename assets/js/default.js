const select = document.querySelector('#accountType');
const home = document.querySelector('.home.container')
const passwordInput = document.querySelector('.user-selected input')
const passwordView = document.querySelector('.user-selected .passwordView')
const listsTask = document.querySelector('.listsTask.container')
const lists = listsTask.querySelector('.lists-body .lists');
const modelsArea = document.querySelector('.modelsArea');
const tasksTamplete = document.querySelector('.tasks.container');
const modalInput = document.querySelector('.modalInput');

const users = [
    {id:1,name:'Jordam Machael',password:'JM1',urlImg:'.../../media/homem.png'},
    {id:2,name:'Miguel Eduardo',password:'ME2',urlImg:'.../../media/homem1.png'},
    {id:3,name:'Pedro Anfré',password:'PA3',urlImg:'.../../media/homem2.png'},
    {id:4,name:'Nami Helena',password:'NH4',urlImg:'.../../media/mulher1.png'},
    {id:5,name:'Carolina Maria',password:'CM5',urlImg:'.../../media/mulher2.png'}
];
const AllListTask = localStorage.getItem('allLists')?
    JSON.parse(localStorage.getItem('allLists')):[];

let userActive,listActive,typeToAdd;

//Substituir Essa var com uma ligação ao Local Storge

users.map(user=>{
    const userOption = document.createElement('option');
    userOption.setAttribute('value',user.id);
    userOption.innerHTML = user.name;
    select.append(userOption)
})

select.addEventListener('input',(e)=>{
    const userId = Number(e.target.value)
    const user = users.filter(user=>user.id === userId)[0];

    enableUser(user)
})

document.querySelector(".home #logIn").addEventListener('click',(e)=>{
    e.preventDefault();

    if (userActive) {
        const password = document.querySelector('.home #password').value;
        confirmUser(userActive,password);
    }
});

passwordInput.addEventListener('input',()=>passwordView.style.opacity = '0')

modalInput.querySelector('a')
    .addEventListener('click',e=>{
        e.preventDefault();
        const itemText = getNewData().trim();

        if (itemText) {
            if (typeToAdd === 'list') {
                AllListTask.push(new CreateListTasks(itemText));
                updateList();
            } 
            if(typeToAdd === 'tasks') {
                listActive.tasks.push(new CreateTasks(itemText));
                updateTasks();
            }
            
            hideModal();
        }
    });