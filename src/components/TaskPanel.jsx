import { Button } from  '@mui/material'
import Tasks from './Tasks.jsx'
import { Add } from '@mui/icons-material'

const DevicesPanel = () => {
    const onClick = () => {

    }
    return (
        <>
            <Button onClick={onClick}  variant="outlined" startIcon = {<Add/>}>Add Task</Button>
            <Tasks />
        </>
    )
}

export default DevicesPanel