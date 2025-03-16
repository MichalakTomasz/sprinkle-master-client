import { Grid } from "@mui/material"
import Task from "./Task"
import useDeviceStore from '../store/deviceStore'
import { useEffect } from 'react'
import container from "../container/container.js"

const Tasks = () => {
  const dataManager = container.resolve("dataManager")
  const tasks = useDeviceStore((state) => state.tasks || [])

  useEffect(() => {
    const fetchData = async () => {
      await dataManager.refreshTasks()
    }
    fetchData()
  }, [])

  return (
    <Grid container spacing={2}>
      {Array.isArray(tasks) && tasks.map((task) => (
        <Grid key={task.id}>
          <Task task={task} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Tasks
