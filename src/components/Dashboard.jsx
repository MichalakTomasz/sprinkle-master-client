import MainMenu from "./MainMenu.jsx"
import StatusBar from "./StatusBar.jsx"
import DeviceStatus from './DeviceStatus.jsx'

const Dashboard = () => {
    return (
        <>
        <h1>Dashboard</h1>
        <nav/>
        <div>
            <div>
                <DeviceStatus/>
            </div>
            <div>
                <MainMenu/>
            </div>
            <div>
                <StatusBar/>
            </div>
        </div>
        </>
    )
}

export default Dashboard