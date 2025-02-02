import NewTask from "./NewTask"
import TaskList from "./TaskList"

const Dashboard = () => {
    return (
        <>
        <h1>Dashboard</h1>
        <nav/>
        <div>
            <div>
                <h2>States</h2>
                <TaskList/>
            </div>
            <div>
                <h2>Add task</h2>
                <NewTask/>
            </div>
        </div>
        </>
    )
}

export default Dashboard