import { Outlet } from "react-router-dom"
import Navbar from "../navbar/Navbar"
import RoleRedirector from "./RoleRedirector"

const Home: React.FC = () => {

    return <>
        <RoleRedirector />
        <Navbar />
        <Outlet />
    </>
}

export default Home