import "./App.css";
import { useRef, useState } from "react";
import { Task } from "./Task";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const ref = useRef(null);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    const task = {
      id: toDoList.length === 0 ? 1 : toDoList[toDoList.length - 1].id + 1,
      taskName: newTask,
      completed: false,
    };

    if (task.taskName !== "") {
      setToDoList([...toDoList, task]);
      ref.current.value = "";
      setNewTask("");
    }
  };

  const handleKeyDown = (event) => {
    const task = {
      id: toDoList.length === 0 ? 1 : toDoList[toDoList.length - 1].id + 1,
      taskName: newTask,
      completed: false,
    };

    if (event.key === "Enter" && task.taskName !== "") {
      setToDoList([...toDoList, task]);
      ref.current.value = "";
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setToDoList(toDoList.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setToDoList(
      toDoList.map((task) => {
        if (task.id === id && task.completed === false) {
          return { ...task, completed: true };
        } else if (task.id === id && task.completed === true) {
          return { ...task, completed: false };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <div className="App">
      <div className="addTask">
        <input
          ref={ref}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Write a task..."
        />
        <button onClick={addTask}>Add task</button>
      </div>
      <div className="list">
        {toDoList.map((task) => {
          return (
            <Task
              taskName={task.taskName}
              id={task.id}
              completed={task.completed}
              deleteTask={deleteTask}
              completeTask={completeTask}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
