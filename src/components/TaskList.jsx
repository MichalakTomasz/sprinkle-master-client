import { useState } from "react"
import TaskController from "../controllers/taskController"
import { baseUrl } from '../models/commonConsts'

const TaskList = () => {
    const [tasks, setTasks] = useState()
    const taskController = new TaskController()
    const refreshTasks = async () => {
        const tasks = await taskController.getTasks(baseUrl)
        if (tasks.typeof(Array))
            setTasks(tasks)
        else{
            return []   
        }
    }
    const onUpdateTask = async (task) => {
        try{
            await taskController.updateTask('url', task)
            refreshTasks()
        }
        catch(e){
            return e.errorMessage
        }
        
    }
    const onDeleteTask = async (id) => {
        try{
            await taskController.deleteTask(baseUrl + id)
            refreshTasks()
        }
        catch(e){
            e.errorMessage
        }        
    }
    
    return (
        <>
            {tasks?.map(t => (
                <div
                key={t.id}>
                    <div>{t.name}</div>
                    <div>{t.start}</div>
                    <div>{t.stop}</div>
                    <div>{t.period}</div>
                    <div>{t.pinNo}</div>
                    <div>{t.isActive}</div>
                    <button onClick={onUpdateTask}>Update Task</button>
                    <button onClick={onDeleteTask}>Delete Task</button>
                </div>))    
            }
        </>
    )
}

export default TaskList