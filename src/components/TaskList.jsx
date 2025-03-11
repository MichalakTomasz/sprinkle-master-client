import { useEffect, useState } from 'react'
import TaskController from '../controllers/taskController'
import { tasks as taskList } from '../setup/mock-data.js'
import {Chip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button'
import TaskDialog from './taskDialog'

const TaskList = () => {
    const [tasks, setTasks] = useState()
    const [error, setError] = useState()
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const taskController = new TaskController()
    const refreshTasks = async () => {
        //const tasks = await taskController.getTasks()
        
        if (Array.isArray(taskList))
            setTasks(taskList)
        else{
            setError(taskList)
            return []   
        }
    }
    useEffect(() => {
        refreshTasks()
    }, [])
    const onUpdateTask = async () => {
        setOpen(true)
    }

    const onDeleteTask = async (id) => {
        try{
            await taskController.deleteTask(id)
            await refreshTasks()
        }
        catch(e){
            console.log(e)
            setError(e.message)
        }        
    }
    
    return (
        <>
            <div>
            {
            tasks?.length > 0 ? tasks.map(t => (
                <div
                key={t.id}>
                    <div>Name: {t.name}</div>
                    <div>Start: {t.start}</div>
                    <div>Stop: {t.stop}</div>
                    <div>Period: {t.period}</div>
                    <div>Active: {t.isActive}</div>
                    <Chip 
                    label="Delete"
                    deleteIcon={<DeleteIcon/>}/>
                    <Button variant='contained' onClick={onUpdateTask}>Update Task</Button>
                    <Button variant='contained' onClick={onDeleteTask(t.id)}>Delete Task</Button>
                    <TaskDialog open={open} onClose={handleClose}/>
                </div>))  :
                <div>{error}</div>  
            }
            </div>
        </>
    )
}

export default TaskList