import { Card, CardContent, Typography, Stack } from '@mui/material'
import CircleIndicator from './CircleIndicator'
import useDeviceStore from '../store/deviceStore'

const DeviceState = ({ device }) => {
    const deviceId = device?.id
    const deviceState = useDeviceStore(state => deviceId ? (state.deviceStates[deviceId] ?? false) : false)

    if (!device) return null;
    
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