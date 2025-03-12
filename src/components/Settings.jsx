import { 
    Card, 
    CardContent, 
    Typography
} from '@mui/material'

const Settings = settings => {
    return (
        <Card>
            <CardContent>
                <Typography>
                    Autostart Scheduler: {settings.autostartScheduler}
                </Typography>
                <Typography>
                    Pump stop delay: {settings.pumpStopDelay}
                </Typography>
                <Typography>
                    Scheduler tick: {settings.schedulerTick}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Settings