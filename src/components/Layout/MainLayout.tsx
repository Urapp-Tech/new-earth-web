import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../Sidebar"
import TopBar from "../TopBar"
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks"
import { useEffect } from "react"

const MainLayout = () => {

    const { user } = useAppSelector(s=> s.authState);
    const navigate = useNavigate();
    useEffect(() => {
        if( !user ) {
            navigate('/auth/login');
        }
    }, [])
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