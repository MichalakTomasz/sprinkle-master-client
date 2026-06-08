import { useEffect, useRef, useState } from 'react'
import { Box, Paper, Stack, Typography } from '@mui/material'
import notificationService from '../services/notificationService.js'

const DOCK_HEIGHT = 188

const formatTimestamp = value => {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) {
        return '--:--:--'
    }

    return date.toLocaleTimeString()
}

const NotificationDock = () => {
    const [notifications, setNotifications] = useState(notificationService.getNotifications())
    const logContainerRef = useRef(null)

    useEffect(() => notificationService.subscribe(setNotifications), [])

    useEffect(() => {
        if (!logContainerRef.current) {
            return
        }

        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }, [notifications])

    return (
        <Paper
            elevation={6}
            sx={{
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 0,
                px: { xs: 1.5, sm: 2, md: 3 },
                py: 1.5,
                height: DOCK_HEIGHT,
                boxSizing: 'border-box',
                overflow: 'hidden',
                zIndex: theme => theme.zIndex.snackbar,
                backgroundColor: theme => theme.palette.background.paper,
                color: theme => theme.palette.text.primary,
                borderTop: theme => `3px solid ${theme.palette.divider}`,
                borderRadius: 0,
            }}
        >
            <Stack spacing={1} sx={{ height: '100%' }}>
                <Typography variant="subtitle2" sx={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Notification log
                </Typography>
                <Box
                    ref={logContainerRef}
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        pr: 0.5,
                        '&::-webkit-scrollbar': {
                            width: 10,
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: theme => theme.palette.background.default,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: theme => theme.palette.divider,
                            borderRadius: 999,
                            border: theme => `2px solid ${theme.palette.background.default}`,
                        },
                        scrollbarColor: theme => `${theme.palette.divider} ${theme.palette.background.default}`,
                        scrollbarWidth: 'thin',
                    }}
                >
                    <Stack spacing={0.75} sx={{ minHeight: '100%', justifyContent: 'flex-end' }}>
                        {notifications.length
                            ? notifications.map(notification => (
                                <Box
                                    key={notification.id}
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: '90px 1fr',
                                        gap: 1,
                                        alignItems: 'start',
                                        px: 1,
                                        py: 0.75,
                                        borderLeft: theme => `4px solid ${notification.severity === 'error' ? theme.palette.error.main : theme.palette.text.primary}`,
                                        backgroundColor: theme => theme.palette.background.default,
                                        fontFamily: 'Consolas, monospace',
                                        lineHeight: 1.4,
                                        wordBreak: 'break-word',
                                        minHeight: 34,
                                    }}
                                >
                                    <Typography variant="caption" sx={{ fontFamily: 'inherit', opacity: 0.8 }}>
                                        {formatTimestamp(notification.createdAt)}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontFamily: 'inherit',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {notification.message}
                                    </Typography>
                                </Box>
                            ))
                            : (
                                <Box
                                    sx={{
                                        px: 1,
                                        py: 0.75,
                                        backgroundColor: theme => theme.palette.background.default,
                                        fontFamily: 'Consolas, monospace',
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontFamily: 'inherit', opacity: 0.75 }}>
                                        Waiting for messages...
                                    </Typography>
                                </Box>
                            )}
                    </Stack>
                </Box>
            </Stack>
        </Paper>
    )
}

export default NotificationDock