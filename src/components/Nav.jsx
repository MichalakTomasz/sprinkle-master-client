import Dashboard from "../components/Dashboard"
import About from "../components/About"
import NewTask from "../components/NewTask"
import { BrowserRouter as Router, Route, Routes } from "react-router"

const Nav = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" Component={Dashboard} />
                <Route path="/newtask" Component={NewTask} />
                <Route path="/about" Component={About} />
            </Routes>
        </Router>
    )
}

export default Nav