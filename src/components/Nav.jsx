import Dashboard from "../components/Dashboard"
import About from "../components/About"
import NewTask from "./TaskForm.jsx"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"

const Nav = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/newtask">New Task</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route exact path="/" Component={Dashboard} />
                <Route path="/newtask" Component={NewTask} />
                <Route path="/about" Component={About} />
            </Routes>
        </Router>
    )
}

export default Nav