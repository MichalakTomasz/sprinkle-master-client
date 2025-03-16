export default class MainController {

    constructor({config}) {
        this.baseUrl = config.baseUrl
    }

    getTasks = async () => {
        try{
            const data = await fetch(this.baseUrl + 'gpio/task', {
                method: 'GET',
                headers: { 'Content-type': 'application/json'}
            })
    
            const result = await data?.json()
            if (!Array.isArray(result)) {
                console.error(result)
                return []
            }

            return result
        }
        catch(e){
            console.log(JSON.stringify(e))
            return e.message
        }
    }

    addTask = async (task) => {
        try{
            const data = await fetch(this.baseUrl + 'gpio/addTask', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify(task)
            })
            return data?.json()
        }
        catch(e){
            return e.message
        }
    }


    updateTask = async (task) => {
        try{
            const data = await fetch(this.baseUrl + 'updateTask', {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify(task)
            })
    
            return data?.json()
        }
        catch(e){
            return e.message
        }
    }
    
    deleteTask = async (id) => {
        try{
            const data = await fetch(this.baseUrl + 'gpio/deleteTask/' + id, { 
                method: 'DELETE',
                headers: { 'Content-type': 'application/json'}
            })
            return data?.json()
        }
        catch(e){
            return e.message
        }
    }

/*
{
  taskId: 4,
  valveId: 3
}
*/
    assignToTask = async assignJson => {
        try{
            const data = await fetch(this.baseUrl + 'gpio/assign', { 
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                body: assignJson
            })
            return data?.json()
        }
        catch(e){
            return e.message
        }
    }

    getTasksStates = async () => {
        try {
            const data = await fetch(this.baseUrl + 'gpio/task/state/', {
                method: 'GET',
                headers: { 'Content-type': 'application/json'}
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
        try{
            const data = await fetch(this.baseUrl + 'gpio/task/state', { 
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify(stateJson)
            })
            const setTaskStateResult = await data?.json()
            if (!setTaskStateResult?.isSuccess) {
                console.error(setTaskStateResult.message)
                return false
            }
            return true
        }
        catch(e){
            console.error(e.message)
            return false
        }
    }

    getValveState = async id => {
        try {
            const data = await fetch(this.baseUrl + 'gpio/valve/state/' + id, {
                method: 'GET',
                headers: { 'Content-type': 'application/json'}
            })
            const getValveStateResult = await data?.json()
            if (!getValveStateResult?.isSuccess) {
                console.error(getValveStateResult.message)
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
            const data = await fetch(this.baseUrl + 'gpio/state/' + pinNo, {
                method: 'GET',
                headers: { 'Content-type': 'application/json'}
            })
            return data?.json()
        }
        catch (e) {
            return e.message
        }
    }

    setValveState = async (stateJson) => {
        try {
            const data = await fetch(this.baseUrl + 'gpio/valve/state', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
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
            const data = await fetch(this.baseUrl + 'gpio/closeAll', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'}
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
        try{
            const data = await fetch(this.baseUrl + 'gpio/valve', {
                method: 'GET',
                headers: { 'Content-type': 'application/json'}
            })
    
            const result = await data?.json()
            if (!Array.isArray(result)) {
                console.error(result)
                return []
            }

            return result
        }
        catch(e){
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
            const data = await fetch(this.baseUrl + 'gpio/valve', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify(valve)
            })
            return data?.json()
        }
        catch (e) {
            return e.message
        }
    }

    updateValve = async valve => {
        try {
            const data = await fetch(this.baseUrl + 'gpio/valve', {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify(valve)
            })
            return data?.json()
        }
        catch (e) {
            return e.message
        }
    }

    deleteValve = async id => {
        try {
            const data = await fetch(this.baseUrl + 'gpio/valve/' + id, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json'},
            })
            return data?.json()
        }
        catch (e) {
            return e.message
        }
    }

    getPump = async () => {
        try{
            const data = await fetch(this.baseUrl + 'gpio/pump', {
                method: 'GET',
                headers: { 'Content-type': 'application/json'}
            })
    
            const result = await data?.json()
            if (!result.isSuccess) {
                console.error(result)
                return []
            }

            return result
        }
        catch(e){
            return e.message
        }
    }


    addPump = async pinNoJson => {
        try{
            const data = await fetch(this.baseUrl + 'gpio/pump', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                body: pinNoJson
            })
    
            return data?.json()
        }
        catch(e){
            return e.message
        }
    }

    updatePump = async pinNo => {
        try{
            const data = await fetch(this.baseUrl + 'gpio/pump', {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json'},
                body: pinNo
            })
    
            return data?.json()
        }
        catch(e){
            return e.message
        }
    }

    deletePump = async () => {
        try{
            const data = await fetch(this.baseUrl + 'gpio/pump', {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json'}
            })
    
            return data?.json()
        }
        catch(e){
            return e.message
        }
    }

    isSchedulerEnabled = async () => {
        try{
            const data = await fetch(this.baseUrl + 'gpio/isSchedulerEnabled', {
                method: 'GET',
                headers: { 'Content-type': 'application/json'}
            })
    
            const result = await data?.json()
            if (!result.isSuccess) {
                console.error(result.message)
                return false
            }
            return result.result
        }
        catch(e){
            console.error(e.message)
            return false
        }
    }

    runScheduler = async () => {
        try{
            const data = await fetch(this.baseUrl + 'gpio/runScheduler', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'}
            })
    
            const runResult = await data?.json()
            if (!runResult.isSuccess){
                console.error(runResult.message)
                return false
            }

            return runResult.isEnabled
        }
        catch(e){
            console.error(e.message)
            return false
        }
    }

    stopScheduler = async () => {
        try{
            const data = await fetch(this.baseUrl + 'gpio/stopScheduler', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'}
            })
    
            const stopResult = await data?.json()
            if (!stopResult.isSuccess){
                console.error(stopResult.message)
                return false
            }

            return stopResult.isEnabled
        }
        catch(e){
            console.error(e.message)
            return false
        }
    }

    getSettings = async () => {
        try{
            const data = await fetch(this.baseUrl + 'gpio/settings', {
                method: 'GET',
                headers: { 'Content-type': 'application/json'}
            })
    
            return data?.json()
        }
        catch(e){
            return e.message
        }
    }

/*
{
  "key": 'pumpStopDelay',
  "value": 3000
}
*/
    setSettings = async settings => {
        try{
            const data = await fetch(this.baseUrl + 'gpio/settings', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                body: settings
            })
    
            return data?.json()
        }
        catch(e){
            return e.message
        }
    }
}