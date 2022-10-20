import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from "react"
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid"
import { v4 as uuidv4 } from 'uuid';

import { Header } from "./components/Header"
import { List } from "./components/List"

import styles from "./App.module.css"

interface Task {
  taskId: string,
  taskText: string,
  taskStatus: boolean,
}


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [taskCreated, setTaskCreated] = useState(2);
  const [taskDone, setTaskDone] = useState(0);
  
  useEffect(() => {
    setTaskCreated(tasks.length);
       
    setTaskDone(
      tasks.filter(task => {
        return task.taskStatus == true
      }).length
    )
  },[tasks])

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  function updateTaskStatus(id: string) {
    const taskUpdated = tasks.map(task => {
      if(task.taskId == id) {
        return {...task, taskStatus: !task.taskStatus}
      }

      return task;
    })
    setTasks(taskUpdated);     
  }

  function deleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.taskId != id;
    });

    setTasks(tasksWithoutDeletedOne);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    
    setTasks([...tasks, {
      taskId: uuidv4(),
      taskText: newTaskText,
      taskStatus: false
    }]);
    
    setNewTaskText('');
  }

  return (
    <>
      <div className={styles.layout}>

      <Header />

      <main className={styles.container}>
        <form onSubmit={handleCreateNewTask} className={styles.newTask}>
          <input
            type="text"
            name="taskText"
            placeholder="Digite uma tarefa"
            value={newTaskText}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button type="submit">Criar</button>
        </form>

        <div className={styles.task}>
          <div className={styles.taskInfo}>
            <h4>Tarefas criadas <span>{taskCreated}</span></h4>
            <h4>Concluidas <span>{taskDone}</span></h4>
          </div>

          <section className={styles.taskList}>
            {tasks.length != 0
              ? (
                tasks.map(item => (
                  <List
                    key={item.taskId}
                    listItemId={item.taskId}
                    listItemText={item.taskText}
                    listItemStatus={item.taskStatus}

                    onUpdateTaskStatus={updateTaskStatus}
                    onDeleteTask={deleteTask}
                  />
                ))
              )
              : (
                <div className={styles.emptyList}>
                  <ClipboardDocumentListIcon />

                  <h4>Você ainda não tem tarefas cadastradas</h4>
                  <p>
                    Crie tarefas e organize seus itens a fazer
                  </p>
                </div>
              )
            }

          </section>
        </div>
      </main >
      </div>
    </>
  )
}

export default App
