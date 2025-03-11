import { 
    Card, 
    CardContent, 
    CardActions, 
    Typography, 
    Switch, 
    Button 
} from "@mui/material";
import  { Edit, Delete }  from "@mui/icons-material"
import Device from './Device.jsx'
import { useState } from 'react'
import TaskDialog from './taskDialog'

const Task = ({ task }) => {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')

    const handleClose = () => {
        setOpen(false)
    }
        
    const onEditClick = () => {
        setTitle("Edit")
        setOpen(true)
    }

    const onDeleteClick = () => {

    }

    return (
        <Card key={task.id} sx={{ minWidth: 275, margin: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {task.name}
                </Typography>
                <Typography variant="body1">
                    State: <Switch checked={task.isActive} />
                </Typography>
                <Typography variant="body2">
                    Start: {task.start}
                </Typography>
                <Typography variant="body2">
                    Stop: {task.stop}
                </Typography>
                <Typography variant="body2">
                    Period: {task.period}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Active: <Switch checked={task.isActive} />
                </Typography>
                {task.devices?.map((device) => (
                    <Device key={device.id} device={device} />
                ))}
            </CardContent>
            <CardActions>
                <Button onClick={onEditClick} variant="outlined" startIcon={<Edit/>}>Edit</Button>
                <Button onClick={onDeleteClick} variant="outlined" startIcon={<Delete/>}>Delete</Button>
                <TaskDialog title={title} task={task} open={open} onClose={handleClose}/>
            </CardActions>
        </Card>
    )
}

export default Task
