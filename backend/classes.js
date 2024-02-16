class Todo{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = false;
    }
    checkTask() {
        this.done = true;
        return
    }
}
class User{
    constructor(username, email, password){
        this.username = username;
        this.emial = email;
        this.password = password;
    }
}

module.exports = Todo;
module.exporst = User;
