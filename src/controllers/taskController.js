export default class TaskController {
    addTask = async (url, task) => {
        try{
            const data = await fetch(url, {
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
    setPinState = async (url, pin) => {
        try{
            const data = await fetch(url, {
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify(pin)
            })
            return data?.json()
        }
        catch(e){
            return e.message
        }
        
    }
    getTasks = async (url) => {
        try{
            const data = await fetch(url, {
                method: 'GET',
                headers: { 'Content-type': 'application/json'}
            })
    
            return data
        }
        catch(e){
            return e.message
        }
        
    }
    updateTask = async (url, task) => {
        try{
            const data = await fetch(url, {
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
    deleteTask = async (url) => {
        try{
            const data = await fetch(url, { 
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