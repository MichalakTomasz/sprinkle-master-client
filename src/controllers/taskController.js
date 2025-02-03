import { baseUrl } from "../models/commonConsts"

export default class TaskController {
    addTask = async (task) => {
        try{
            const data = await fetch(baseUrl + 'gpio/addTask', {
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

    getPinState = async (pinNo) => {
        try {
            const data = await fetch(baseUrl + 'gpio/getPinState' + pinNo, {
                method: 'GET',
                headers: { 'Content-type': 'application/json'}
            })
            return data?.json()
        }
        catch (e) {
            return e.message
        }
    }

    setPinState = async (pin) => {
        try {
            const data = await fetch(baseUrl + 'gpio/setPinState', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify(pin)
            })
            return data?.json()
        }
        catch (e) {
            return e.message
        }
    }
  
    getTasks = async () => {
        try{
            const data = await fetch(baseUrl + 'gpio/getTasks', {
                method: 'GET',
                headers: { 'Content-type': 'application/json'}
            })
    
            return data
        }
        catch(e){
            return e.message
        }
        
    }

    updateTask = async (task) => {
        try{
            const data = await fetch(baseUrl + 'updateTask', {
                method: 'PUT',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify(task)
            })
    
            return data
        }
        catch(e){
            return e.message
        }
    }
    
    deleteTask = async (id) => {
        try{
            const data = await fetch(baseUrl + 'gpio/deleteTask/' + id, { 
                method: 'DELETE',
                headers: { 'Content-type': 'application/json'}
            })
            return data
        }
        catch(e){
            return e.message
        }
    }
}