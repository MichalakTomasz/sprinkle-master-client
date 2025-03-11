import { CardContent, CardActions, Switch, Typography, Card, Button } from '@mui/material'
import PinState from '../models/PinState.js'
import { Edit, Delete } from '@mui/icons-material'

const Device = ({device}) => {
    const editOnClick = () => {

    }

    const deleteOnClick = () => {

    }

    return (
        <Card key={device.id} sx={{ minWidth: 275, margin: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {device.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                    State: <Switch checked={device.state === PinState.HIGH} />
                </Typography>
                <Typography variant="body2">
                    GPIO Pin: {device.pinNo}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={editOnClick} variant="outlined" startIcon={<Edit/>}>Edit</Button>
                <Button onClick ={deleteOnClick} variant="outlined" startIcon={<Delete/>}>Delete</Button>
            </CardActions>
        </Card>
    )
}

export default Device