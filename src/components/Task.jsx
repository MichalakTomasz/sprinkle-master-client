import { 
    Card, 
    CardContent, 
    CardActions, 
    Typography, 
    Switch, 
    Button,
    Box, 
    Stack
} from "@mui/material";
import { Edit, Delete, InvertColors, InvertColorsOff } from "@mui/icons-material"
import SimpleDevice from './SimpleDevice.jsx'
import { useState } from 'react'
import TaskDialog from './TaskDialog'
import PinState from "../models/PinState.js";
import container from "../container/container.js";

const Task = ({ task }) => {
    const dataManager = container.resolve('dataManager')
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
        // Add delete logic here
    }

    const onOpenClick = async () => {
        await dataManager.setTaskState({
            id: task.id,
            state: PinState.HIGH
        })
    }

    const onCloseClick = async () => {
        await dataManager.setTaskState({
            id: task.id,
            state: PinState.LOW
        })
    }

    return (
        <Card sx={{ minWidth: 275, margin: 2 }}>
          <CardContent>
            <Box>
                <Typography variant="h5" component="div" gutterBottom>
                    {task.name}
                </Typography>
                <Box display="flex" alignItems="center">
                    <Stack spacing={2} direction='row' alignItems="center">
                        <Button onClick={onCloseClick} startIcon={<InvertColorsOff/>}>Close</Button>
                        <Button onClick={onOpenClick} startIcon={<InvertColors/>}>Open</Button>
                    </Stack>                    
                </Box>
                <Typography component="div">
                    Start: {task.start}
                </Typography>
                <Typography component="div">
                    Stop: {task.stop}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography component="span">Active:</Typography>
                    <Switch checked={task.isActive} />
                </Box>
            </Box>
            <Box mt={2}>
                {task.devices?.map((device) => (
                    <SimpleDevice key={device.id} device={device} />
                ))}
            </Box>
            <CardActions>
                <Button 
                    onClick={onEditClick} 
                    variant="outlined" 
                    startIcon={<Edit/>}
                >
                    Edit
                </Button>
                <Button 
                    onClick={onDeleteClick} 
                    variant="outlined" 
                    startIcon={<Delete/>}
                >
                    Delete
                </Button>
                <TaskDialog 
                    title={title} 
                    task={task} 
                    open={open} 
                    onClose={handleClose}
                />
            </CardActions>
          </CardContent>
        </Card>
    )
}

export default Task