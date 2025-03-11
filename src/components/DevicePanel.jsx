import { Button } from  '@mui/material'
import Devices from './Devices.jsx'
import { Add } from '@mui/icons-material'

const DevicePanel = () => {
    const onClick = () => {
        
    }
    return (
        <>
            <Button onClick={onClick} variant="outlined" startIcon={<Add/>}>Add Device</Button>
            <Devices />
        </>
    )
}

export default DevicePanel