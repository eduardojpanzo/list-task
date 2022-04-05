class CreateListTasks{
    static lastIdList = 0;

    constructor(title){
        this.id = CreateListTasks.lastIdList++;
        this.title = title;
        this.userRef = userActive.id;
        this.tasks = [];
    }
}

class CreateTasks{
    static lastIdTask = 0;

    constructor(name){
        this.id = CreateTasks.lastIdTask++;
        this.name = name;
        this.status = false;
    }
}