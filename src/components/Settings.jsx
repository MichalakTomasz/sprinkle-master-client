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
                    Pump stop delay: {settings.pumpStopDelay}
                    Scheduler tick: {settings.schedulerTick}
                </Typography>
                <Typography>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Settings