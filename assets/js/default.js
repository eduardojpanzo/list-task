const select = document.querySelector('#accountType');
const  home = document.querySelector('.home.container')
const  lists = document.querySelector('.lists.container')
const  tasks = document.querySelector('.tasks.container')
const users = [
    {id:1,name:'Jordam Machael',password:'JM1',urlImg:'.../../media/homem.png'},
    {id:2,name:'Miguel Eduardo',password:'ME2',urlImg:'.../../media/homem1.png'},
    {id:3,name:'Pedro Anfré',password:'PA3',urlImg:'.../../media/homem2.png'},
    {id:4,name:'Nami Helena',password:'NH4',urlImg:'.../../media/mulher1.png'},
    {id:5,name:'Carolina Maria',password:'CM5',urlImg:'.../../media/mulher2.png'}
];

const listTask = [
    {
        id:1,
        userRef:1,
        title:'Fazer Compras',
        tasks:[
            {id:1,name:"Arroz"},
            {id:2,name:"Feijão"},
            {id:3,name:"Tomate"},
            {id:4,name:"Farinha"}
        ]
    },
    {
        id:2,
        userRef:1,
        title:'Programar',
        tasks:[
            {id:1,name:"Java"},
            {id:2,name:"JavaScript"},
            {id:3,name:"Php"}
        ]
    },
    {
        id:3,
        userRef:2,
        title:'Estudar Física',
        tasks:[
            {id:1,name:"Mecânica"},
            {id:2,name:"Elétrostatica"},
            {id:3,name:"Termodinâmica"},
            {id:4,name:"Ondas"}
        ]
    },
    {
        id:4,
        userRef:2,
        title:'Fazer Exercícos',
        tasks:[
            {id:1,name:"Agachamento"},
            {id:2,name:"Fleções"},
            {id:3,name:"Levantar Peso"},
            {id:4,name:"Correr"},
            {id:5,name:"Saltar"}
        ]
    },
    {
        id:5,
        userRef:3,
        title:'Fazer Compras',
        tasks:[
            {id:1,name:"PC"},
            {id:2,name:"Impressora"},
            {id:3,name:"Tinta"},
            {id:4,name:"Lapiseras"},
            {id:4,name:"Cadernos"},
            {id:5,name:"Roupas"}
        ]
    }
]

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