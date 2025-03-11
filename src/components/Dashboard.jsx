import MainMenu from "./MainMenu.jsx"
import NewTask from "./TaskForm.jsx"

const Dashboard = () => {
    return (
        <>
        <h1>Dashboard</h1>
        <nav/>
        <div>
            <div>
                <MainMenu/>
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