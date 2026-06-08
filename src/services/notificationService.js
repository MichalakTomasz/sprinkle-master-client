const listeners = new Set()
let notifications = []
let nextNotificationId = 1
const maxNotifications = 250

const emitChange = () => {
    const snapshot = [...notifications]
    listeners.forEach(listener => listener(snapshot))
}

const removeNotification = id => {
    notifications = notifications.filter(notification => notification.id !== id)
    emitChange()
}

const addNotification = ({ message, severity = 'info' }) => {
    const normalizedMessage = typeof message === 'string' ? message.trim() : ''
    if (!normalizedMessage) {
        return null
    }

    const notification = {
        id: nextNotificationId++,
        message: normalizedMessage,
        severity,
        createdAt: new Date().toISOString(),
    }

    notifications = [...notifications, notification].slice(-maxNotifications)
    emitChange()

    return notification.id
}

const subscribe = listener => {
    listeners.add(listener)
    listener([...notifications])

    return () => {
        listeners.delete(listener)
    }
}

const getNotifications = () => [...notifications]

const addResponseMessage = response => {
    if (!response || typeof response !== 'object' || Array.isArray(response)) {
        return response
    }

    if (!response.message) {
        return response
    }

    const severity = response.isSuccess === false ? 'error' : 'success'
    addNotification({
        message: response.message,
        severity
    })

    return response
}

const addErrorMessage = message => {
    addNotification({
        message,
        severity: 'error'
    })
}

const notificationService = {
    addNotification,
    addResponseMessage,
    addErrorMessage,
    removeNotification,
    subscribe,
    getNotifications,
}

export default notificationService