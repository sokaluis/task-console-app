require("colors");
const Task = require("./task");

class Tasks {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];

      listado.push(tarea);
    });

    return listado;
  }

  loadTaskFromDB = (tasks = []) => {
    tasks.map((item) => {
      this._listado[item.id] = item;
    });
  };

  createTask(desc = "") {
    const task = new Task(desc);
    this._listado[task.id] = task;
  }

  taskList() {
    const completeList = this.listadoArr;
    console.log("\n");
    completeList.map((item, index) => {
      const idx = `${index + 1}`.green;
      const { desc, completedIn } = item;
      const status = completedIn ? "Completed".green : "Pending".red;

      console.log(`${idx}. ${desc} :: ${status}`);
    });
  }

  taskListByStatus(completed = true) {
    const completeList = this.listadoArr;
    let counter = 0;
    console.log("\n");
    completeList.map((item) => {
      const { desc, completedIn } = item;
      const status = completedIn ? "Completed".green : "Pending".red;

      if (completed) {
        if (completedIn) {
          counter += 1;
          console.log(
            `${counter.toString().green}. ${desc} :: ${completedIn.green}`
          );
        }
      } else {
        if (!completedIn) {
          counter += 1;
          console.log(`${counter.toString().green}. ${desc} :: ${status}`);
        }
      }
    });
  }

  deleteTask(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];

      if (!tarea.completedIn) {
        tarea.completedIn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._listado[task.id].completedIn = null;
      }
    });
  }
}

module.exports = Tasks;
