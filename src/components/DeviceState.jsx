import { Card, CardContent, Typography, Stack } from '@mui/material'
import CircleIndicator from './CircleIndicator'
import useDeviceStore from '../store/deviceStore'

const DeviceState = ({ device }) => {
    if (!device) return null;
    
    const deviceState = useDeviceStore(state => state.deviceStates[device.id] ?? false)
    
    return (
        <Card>
            <CardContent>
                <Stack  alignItems="center" >
                    <Typography>{device.name}</Typography>
                    <CircleIndicator isActive={deviceState} />
                </Stack>    
            </CardContent>
        </Card>
    )
}

export default DeviceState