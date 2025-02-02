import { useEffect, useState } from "react"
import TaskController from "../controllers/taskController"
import { baseUrl } from '../models/commonConsts'

const TaskList = () => {
    const [tasks, setTasks] = useState()
    const [error, setError] = useState()
    const taskController = new TaskController()
    const refreshTasks = async () => {
        const tasks = await taskController.getTasks(baseUrl)
        if (Array.isArray(tasks))
            setTasks(tasks)
        else{
            setError(tasks)
            return []   
        }
    }
    useEffect(() => {
        refreshTasks()
    })
    const onUpdateTask = async (task) => {
        try{
            await taskController.updateTask(baseUrl, task)
            await refreshTasks()
        }
        catch(e){
            console.log(e)
            setError(e.message)
        }
        
    }
    const onDeleteTask = async (id) => {
        try{
            await taskController.deleteTask(baseUrl + id)
            await refreshTasks()
        }
        catch(e){
            console.log(e)
            setError(e.message)
        }        
    }
    
    return (
        <>
            {tasks?.length > 0 ? tasks.map(t => (
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
                </div>))  :
                <div>{error}</div>  
            }
        </>
    )
}

export default TaskList