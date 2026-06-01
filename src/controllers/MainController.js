import getBaseUrl from '../services/baseUrlService.js'
import Settings from '../models/Settings.js'
import { getClientId } from '../helpers/clientIdHelper.js'

export default class MainController {

    constructor() {
        this.baseUrl = getBaseUrl()
        this.clientId = getClientId()
    }

    getRequestHeaders = (headers = {}) => ({
        'Content-type': 'application/json',
        clientId: this.clientId,
        ...headers
    })

    request = (path, options = {}) => {
        const { headers, ...restOptions } = options

        return fetch(this.baseUrl + path, {
            ...restOptions,
            headers: this.getRequestHeaders(headers)
        })
    }

    getTasks = async () => {
        try {
            const data = await this.request('gpio/task', {
                method: 'GET'
            })

            const result = await data?.json()
            if (!Array.isArray(result)) {
                return []
            }

            return result
        }
        catch (e) {
            console.error(e.message)
            return []
        }
    }

    addTask = async (task) => {
        try {
            const data = await this.request('gpio/task', {
                method: 'POST',
                body: JSON.stringify(task)
            })
            return data?.json()
        }
        catch (e) {
            console.error(e.message)
            return {
                isSuccess: false,
                message: `Add Task error: ${e.message}`
            }
        }
    }

    updateTask = async (task) => {
        try {
            const data = await this.request('gpio/task', {
                method: 'PATCH',
                body: JSON.stringify(task)
            })

            return data?.json()
        }
        catch (e) {
            console.error(e.message)
            return {
                isSuccess: false,
                message: `Update Task error: ${e.message}`
            }
        }
    }

    deleteTask = async (id) => {
        try {
            const data = await this.request('gpio/task/' + id, {
                method: 'DELETE'
            })

            return data?.json()
        }
        catch (e) {
            console.error(e.message)
            return {
                isSuccess: false,
                message: `Delete Task error: ${e.message}`
            }
        }
    }

    /*
    {
      taskId: 4,
      valveId: 3
    }
    */
    assignToTask = async assignJson => {
        try {
            const data = await this.request('gpio/task/assign', {
                method: 'POST',
                body: JSON.stringify(assignJson)
            })

            return data?.json()
        }
        catch (e) {
            console.error(e.message)
            return {
                isSuccess: false,
                message: `Assign Task error: ${e.message}`
            }
        }
    }

    unassignFromTask = async unassignJson => {
        try {
            const data = await this.request('gpio/task/unassign', {
                method: 'POST',
                body: JSON.stringify(unassignJson)
            })
            return data?.json()
        }
        catch (e) {
            console.error(e.message)
            return {
                isSuccess: false,
                message: `Unassign Task error: ${e.message}`
            }
        }
    }

    getTasksStates = async () => {
        try {
            const data = await this.request('gpio/task/state/', {
                method: 'GET'
            })
            const tasksStatesResult = await data?.json()
            if (!tasksStatesResult?.isSuccess) {
                console.error(tasksStatesResult.message)
                return []
            }
        }
        catch (e) {
            console.error(e.message)
            return []
        }
    }

    /*
    {
      "id": 4,
      "state: "LOW"
    }
    */
    setTaskState = async stateJson => {
        try {
            const data = await this.request('gpio/task/state', {
                method: 'POST',
                body: JSON.stringify(stateJson)
            })
            const setTaskStateResult = await data?.json()
            if (!setTaskStateResult?.isSuccess) {
                return false
            }
            return true
        }
        catch (e) {
            console.error(e.message)
            return false
        }
    }

    getValveState = async id => {
        try {
            const data = await this.request('gpio/valve/state/' + id, {
                method: 'GET'
            })
            const getValveStateResult = await data?.json()
            if (!getValveStateResult?.isSuccess) {
                return false
            }

            return getValveStateResult
        }
        catch (e) {
            return e.message
        }
    }

    getPinState = async pinNo => {
        try {
            const data = await this.request('gpio/state/' + pinNo, {
                method: 'GET'
            })
            return data?.json()
        }
        catch (e) {
            return e.message
        }
    }

    setValveState = async (stateJson) => {
        try {
            const data = await this.request('gpio/valve/state', {
                method: 'POST',
                body: JSON.stringify(stateJson)
            })
            return data?.json()
        }
        catch (e) {
            return e.message
        }
    }

    closeAll = async () => {
        try {
            const data = await this.request('gpio/closeAll', {
                method: 'POST'
            })
            const closeAllResult = await data?.json()
            if (!closeAllResult.isSuccess) {
                console.error(closeAllResult.message)
                return false
            }
            return true
        }
        catch (e) {
            console.error(e.message)
            return false
        }
    }

    getValves = async () => {
        try {
            const data = await this.request('gpio/valve', {
                method: 'GET'
            })

            const result = await data?.json()
            if (!Array.isArray(result)) {
                return []
            }

            return result
        }
        catch (e) {
            console.error(e.message)
            return []
        }
    }

    /*
    {
      "name": "zawor-1",
      "pinNo": 27
    }
    */
    addValve = async (valve) => {
        try {
            const data = await this.request('gpio/valve', {
                method: 'POST',
                body: JSON.stringify(valve)
            })
            const result = await data?.json()
            if (!result.isSuccess) {
                return result
            }

            return result
        }
        catch (e) {
            console.log(e.message)
            return {
                isSuccess: false,
                message: `Add Valve error: ${e.message}`
            }
        }
    }

    updateValve = async valve => {
        try {
            const data = await this.request('gpio/valve', {
                method: 'PATCH',
                body: JSON.stringify(valve)
            })

            const result = await data?.json()
            if (!result.isSuccess) {
                return result
            }

            return result
        } catch (e) {
            console.log(e.message)
            return {
                isSuccess: false,
                message: `Add Valve error: ${e.message}`
            }
        }
    }

    deleteValve = async id => {
        try {
            const data = await this.request('gpio/valve/' + id, {
                method: 'DELETE'
            })
            const result = await data?.json()
            if (!result.isSuccess) {
                return result
            }

            return result
        } catch (e) {
            console.log(e.message)
            return {
                isSuccess: false,
                message: `Delete Valve error: ${e.message}`
            }
        }
    }

    getPump = async () => {
        try {
            const data = await this.request('gpio/pump', {
                method: 'GET'
            })

            const result = await data?.json()
            if (!result.isSuccess) {
                return null
            }

            return result.result
        }
        catch (e) {
            console.error(e.message)
            return null
        }
    }


    addPump = async pinNoJson => {
        try {
            const data = await this.request('gpio/pump', {
                method: 'POST',
                body: pinNoJson
            })

            return data?.json()
        }
        catch (e) {
            return e.message
        }
    }

    updatePump = async pinNo => {
        try {
            const data = await this.request('gpio/pump', {
                method: 'PATCH',
                body: JSON.stringify(pinNo)
            })

            return data?.json()
        }
        catch (e) {
            return e.message
        }
    }

    deletePump = async () => {
        try {
            const data = await this.request('gpio/pump', {
                method: 'DELETE'
            })

            return data?.json()
        }
        catch (e) {
            return e.message
        }
    }

    isSchedulerEnabled = async () => {
        try {
            const data = await this.request('gpio/isSchedulerEnabled', {
                method: 'GET'
            })

            const result = await data?.json()
            if (!result.isSuccess) {
                return false
            }
            return result.result
        }
        catch (e) {
            console.error(e.message)
            return false
        }
    }

    runScheduler = async () => {
        try {
            const data = await this.request('gpio/runScheduler', {
                method: 'POST'
            })

            const runResult = await data?.json()
            if (!runResult.isSuccess) {
                return false
            }

            return runResult.isEnabled
        }
        catch (e) {
            console.error(e.message)
            return false
        }
    }

    stopScheduler = async () => {
        try {
            const data = await this.request('gpio/stopScheduler', {
                method: 'POST'
            })

            const stopResult = await data?.json()
            if (!stopResult.isSuccess) {
                return false
            }

            return stopResult.isEnabled
        }
        catch (e) {
            console.error(e.message)
            return false
        }
    }

    getSettings = async () => {
        try {
            const data = await this.request('gpio/settings', {
                method: 'GET'
            })

            const settingsResult = await data?.json()
            if (!settingsResult.isSuccess) {
                return null
            }

            return settingsResult.result
        }
        catch (e) {
            console.error(e.message)
            return null
        }
    }

    /*
    [{
      "key": 'pumpStopDelay',
      "value": 3000
    }]
    */
    setSettings = async settings => {
        try {
            const data = await this.request('gpio/settings', {
                method: 'PATCH',
                body: JSON.stringify(settings)
            })

            const result = await data?.json()
            return result
        }
        catch (e) {
            const message = `Error fupdate settings: ${e.message}`
            console.error(message)
            return {
                isSuccess: false,
                message: `Error update settings: ${e.message}`
            }
        }
    }

    getUseWeatherAssistant = async () => {
        try {
            const data = await this.request('gpio/settings/byKey/' + Settings.useWeatherAssistant, {
                method: 'GET'
            })

            const settingsResult = await data?.json()
            if (!settingsResult.isSuccess) {
                return null
            }

            return settingsResult.result
        }
        catch (e) {
            console.error(e.message)
            return null
        }
    }

    setUseWeatherAssistant = async value => {
        try {
            const data = await this.request('gpio/settings', {
                method: 'PATCH',
                body: JSON.stringify([{ key: Settings.useWeatherAssistant, value: value }])
            })

            const result = await data?.json()
            return result
        }
        catch (e) {
            const message = `Error updatae use weather assistant: ${e.message}`
            console.error(message)
            return {
                isSuccess: false,
                message: `Error update use weather assistant: ${e.message}`
            }
        }
    }
}