import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar"
import TopBar from "../TopBar"

const MainLayout = () => {
    return (
        <div className="bg-lightgrey">
            <TopBar />
            <div className="flex justify-between items-start">
                <Sidebar />
                <div className="w-[90%] px-2 py-2">
                    <Outlet />

                </div >
            </div >

        </div>
    )
}

export default MainLayout