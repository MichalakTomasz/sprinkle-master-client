import { v4 as uuidv4 } from 'uuid'

const CLIENT_ID_STORAGE_KEY = 'clientId'

export const getClientId = () => {
    const clientId = localStorage.getItem(CLIENT_ID_STORAGE_KEY)
    if (clientId) {
        return clientId
    }

    const newClientId = uuidv4()
    localStorage.setItem(CLIENT_ID_STORAGE_KEY, newClientId)

    return newClientId
}