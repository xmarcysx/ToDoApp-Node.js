const parseArgs = require("minimist");
const colors = require("colors");
const fs = require("fs");

const command = parseArgs(process.argv.slice(2, 3));
delete command._;

console.log("");
console.log("Welcome in To-Do-App".white.bgGreen);
console.log("Your powers:");
console.log("--add='TASK', --remove='TASK', --list");
console.log("=======================================");
const handleCommand = ({ add, remove, list }) => {
  if (add) {
    if (typeof add !== "string") {
      return console.log("Error. Add has to be string type".red);
    } else if (add.length < 7) {
      return console.log("Error. Name has to be more than 6!".red);
    }
    handleData(1, add);
  } else if (remove) {
    if (typeof remove !== "string" || remove.length < 7) {
      return console.log("Error. The name is wrong!".red);
    }
    handleData(2, remove);
  } else if (list || list === "") {
    handleData(3, null);
  } else {
    console.log("Error wrong task!".red);
  }
};

const handleData = (type, title) => {
  //type - number( 1 - add, 2 - remove, 3 - list)
  const data = fs.readFileSync("data.json");
  const tasks = JSON.parse(data);

  if (type === 1 || type === 2) {
    isExisted = tasks.find((task) => task.title === title) ? true : false;
    if (type === 1 && isExisted) {
      return console.log("This task exists!".red);
    } else if (type === 2 && !isExisted) {
      return console.log("I can't delete this task, It doesn't exist!".red);
    }
  }

  switch (type) {
    case 1:
      const id = tasks.length + 1;
      tasks.push({ id: id, title: title });
      const dataJSON = JSON.stringify(tasks);
      fs.writeFileSync("data.json", dataJSON);
      console.log("Task has been added".green);
      break;
    case 2:
      const index = tasks.findIndex((task) => task.title === title);
      tasks.splice(index, 1);
      const data_JSON = JSON.stringify(tasks);
      fs.writeFile("data.json", data_JSON, "utf-8", (err) => {
        if (err) throw err;
        console.log("Task has been removed".green);
      });
      break;
    case 3:
      console.log("Your To-Do-List:".white.bgBlack);
      if (tasks.length) {
        tasks.forEach((task) => {
          console.log(" - " + task.title);
        });
      }
      break;
  }
};

handleCommand(command);
