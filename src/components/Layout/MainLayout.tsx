import { useAppSelector } from "@/redux/redux-hooks"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../Sidebar"
import TopBar from "../TopBar"

const MainLayout = () => {

    const { user } = useAppSelector(s => s.authState);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/auth/login');
        }
    }, [])
    return (
        <div className="bg-lightgrey">
            <TopBar />
            <div className="flex justify-between items-start h-full">
                <Sidebar />
                <div className="w-[90%] px-2 py-2 max-[768px]:w-[85%] max-[576px]:w-full max-[576px]:px-2">
                    <Outlet />

                </div >
            </div >

        </div>
    )
}

export default MainLayout