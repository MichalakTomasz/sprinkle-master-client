import { Formik } from "formik";
import ClientTask from "../models/ClientTask";
import TaskController from "../controllers/taskController";
import { baseUrl } from "../models/commonConsts";

const NewTask = () => {
  const onSubmit = (values) => {
    const clientTask = new ClientTask(0, values.name, values.start, values.stop, values.period, values.pinNo, values.state, values.isActive)
    const taskController = new TaskController()
    taskController.addTask(baseUrl, clientTask)
  }

  return (
    <>
      <h1>Add Task</h1>
      <Formik initialValues={{ name: "", start: "", stop: "", period: "", pinNo: 0, state: 0, isActive: false }} onSubmit={onSubmit}>
        {({ handleSubmit, handleChange, values }) => (
          <form onSubmit={handleSubmit}>
             
            <input 
            type="text" 
            onChange={handleChange}
            name="name"
            placeholder="name"
            value={values.name}
            />
            <input 
            type="text" 
            onChange={handleChange}
            name="start"
            placeholder="start"
            value={values.start}
            />
            <input 
            type="text" 
            onChange={handleChange}
            name="stop"
            placeholder="stop"
            value={values.stop}
            />
            <input 
            type="text" 
            onChange={handleChange}
            name="period"
            placeholder="period"
            value={values.period}
            />
             <input 
            type="text" 
            onChange={handleChange}
            name="pinNo"
            placeholder="pinNo"
            value={values.pinNo}
            />
            <input 
            type="text" 
            onChange={handleChange}
            name="start"
            placeholder="start"
            value={values.start}
            />  
            <input 
            type="text" 
            onChange={handleChange}
            name="pinNo"
            placeholder="pinNo"
            value={values.pinNo}
            />         
            <input 
            type="text" 
            onChange={handleChange}
            name="isActive"
            placeholder="isActive"
            value={values.isActive}
            />
            <button type="submit">Add</button>
          </form>
        )}
      </Formik>
    </>
  )
}

export default NewTask
