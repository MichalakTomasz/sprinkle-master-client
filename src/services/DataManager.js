import useDeviceStore from '../store/deviceStore'
import convertPinState from '../helpers/convertPinState'

export class DataManager {
    constructor({ mainController }) {
        this.controller = mainController
    }
    
    refreshTasks = async () => {
        const result = await this.controller.getTasks()
        useDeviceStore.getState().setTasks(result)
    }

    addTask = async task => await this.controller.addTask(task)
    updateTask = async task => await this.controller.updateTask(task)
    deleteTask = async id => await this.controller.deleteTask(id)
    assignToTask = async assignJson => await this.controller.assignToTask(assignJson)
    unassignFromTask = async assignJson => await this.controller.unassignFromTask(assignJson)
    
    setTaskState = async stateJson => {
        const changeTaskStateResult = await this.controller.setTaskState(stateJson)
        if (changeTaskStateResult) {
            this.refreshPump()
            this.refreshValves()
        }
    }

    refreshValves = async () => {
        const valves = await this.controller.getValves()
        useDeviceStore.getState().setValves(valves)
        valves?.forEach(v => useDeviceStore.getState().setDeviceState(v.id, convertPinState(v.state)))
    }

    getValveState = async id => await this.controller.getValveState(id)
    setValveState = async stateJson => await this.controller.setValveState(stateJson)
    addValve = async valve => await this.controller.addValve(valve)
    updateValve = async valve => await this.controller.updateValve(valve)
    deleteValve = async id => await this.controller.deleteValve(id)
    closeAll = async () => {
        const closeAllResult = await this.controller.closeAll()
        if (closeAllResult){
            this.refreshPump()
            this.refreshValves()
        }
    }

    refreshPump = async () => {
        const result = await this.controller.getPump()
        if (result) {
            const pump = result
            useDeviceStore.getState().setPump(pump)
            useDeviceStore.getState().setDeviceState(pump.id, convertPinState(pump.state))
        }
    }
    getPump = async () => await this.controller.getPump()
    addPump = async pinNoJson => await this.controller.addPump(pinNoJson)
    updatePump = async pinNoJson => await this.controller.updatePump(pinNoJson)
    deletePump = async () => await this.controller.deletePump()

    refreshIsSchedulerEnabled = async () => {
        const isEnabledResult = await this.controller.isSchedulerEnabled()
        useDeviceStore.getState().setIsSchedulerEnabled(isEnabledResult)
    }

    runScheduler = async () => {
        await this.controller.runScheduler()
    }

    stopScheduler = async () => {
        await this.controller.stopScheduler()
    }

    getSettings = async () => await this.controller.getSettings()
    setSettings = async settings => await this.controller.setSettings(settings)
}

export default DataManager