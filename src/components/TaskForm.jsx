import { Box, TextField, Button, Switch, FormControlLabel, Select, MenuItem } from '@mui/material'
import { useFormik } from "formik"
import ClientTask from "../models/ClientTask"
import TaskController from "../controllers/taskController"

const TaskForm = () => {
  const periodOptions = [
    { value: 'EVERYDAY', label: 'Every day' },
    { value: 'MONDAY', label: 'Monday' },
    { value: 'TUESDAY', label: 'Tuesday' },
    { value: 'WEDNSDAY', label: 'Wednesday' },
    { value: 'THURSDAY', label: 'Thursday' },
    { value: 'FRIDAY', label: 'Friday' },
    { value: 'SATERDAY', label: 'Saterday' },
    { value: 'SUNDAY', label: 'Sunday' }
  ];

  const onSubmit = (values) => {
    const clientTask = new ClientTask(0, values.name, values.pinNo, values.start, values.stop, values.period, values.isActive)
    const taskController = new TaskController()
    taskController.addTask(clientTask)
  }

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: '',
      start: '',
      stop: '',
      period:'',
      isActive: false
    },
    onSubmit: onSubmit
  })

  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 2,
          '& .MuiTextField-root': { width: '100%' },
        }}
      >
            <TextField 
              label="Name"
              type="text" 
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <TextField 
              label="Start Time"
              type="time" 
              name="start"
              value={formik.values.start}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField 
              label="Stop Time"
              type="time" 
              name="stop"
              value={formik.values.stop}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Select
              label="Period"
              name="period"
              value={formik.values.period}
              onChange={formik.handleChange}
            >
              {periodOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>      
            <FormControlLabel
              control={
                <Switch
                  name="isActive"
                  checked={formik.values.isActive}
                  onChange={formik.handleChange}
                />
              }
              label="Active"
            />
            <Button variant="outlined" type="submit">Add</Button>
      </Box>
    </>
  )
}

export default TaskForm
