import assets from "@/assets";
import { logout } from "@/redux/features/authStateSlice";
import { useAppDispatch } from "@/redux/redux-hooks";
import React from "react";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
const Sidebar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth/login');
    };
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <>
            <div className=' w-[10%] max-w-[100px] flex flex-col gap-[70px] bg-lightgrey px-[20px] max-[1024px]:w-[70px] max-[768px]:hidden'>

                <div className="basis-[60%] mx-auto">
                    <div className="max-h-[380px] w-[80px] bg-grey rounded-[45px] text-center">
                        <NavLink to="/">
                            <Button className="bg-transparent my-[10px] rounded-[28px] w-[56px] h-[56px] btn-flips hover:bg-primary">
                                <img src={assets.images.slIcon} alt="icon" className="w-[24px]" />
                            </Button>
                        </NavLink>
                        <NavLink to="/gallery">
                            <Button className="bg-transparent my-[10px] rounded-[28px] w-[56px] h-[56px] btn-flips hover:bg-primary">
                                <img src={assets.images.photoIcon} alt="icon" className="w-[24px]" />
                            </Button>
                        </NavLink>
                        <NavLink to="/plans">
                            <Button className="bg-transparent my-[10px] rounded-[28px] w-[56px] h-[56px] btn-flips hover:bg-primary">
                                <img src={assets.images.clipboardIcon} alt="icon" className="w-[24px]" />
                            </Button>
                        </NavLink>
                        <Button className="bg-transparent my-[10px] rounded-[28px] w-[56px] h-[56px] btn-flips hover:bg-primary">
                            <img src={assets.images.startegyIcon} alt="icon" className="w-[24px]" />
                        </Button>
                        <Button className="bg-transparent my-[10px] rounded-[28px] w-[56px] h-[56px] btn-flips hover:bg-primary">
                            <img src={assets.images.busnessIcon} alt="icon" className="w-[24px]" />
                        </Button>
                    </div>
                </div>
                <div className="basis-[20%] text-center">
                    <Button className="bg-transparent my-[10px] rounded-[28px] w-[56px] h-[56px] p-0">
                        <img src={assets.images.avatar1} alt="icon" className="max-w-full w-full h-full object-contain" />
                    </Button>
                    <Button onClick={handleLogout} className="bg-grey my-[10px] rounded-[28px] w-[56px] h-[56px] btn-flips">
                        <img src={assets.images.logoutIcon} alt="icon" className="w-[24px]" />
                    </Button>
                </div>
            </div>
            {/* drawer */}
            <div className="w-[10%] max-w-[100px] flex flex-col gap-[70px] bg-lightgrey px-[20px] max-[768px]:w-[15%] side-draw max-[576px]:absolute max-[576px]:top-[40px] max-[576px]:left-0 max-[576px]:h-0">
                <button onClick={toggleDrawer} className="min-[768px]:hidden w-[40px] h-[40px] bg-white rounded-lg shadow-gray-800"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path d="M4 18H10" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                    <path d="M4 12L16 12" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                    <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                </svg></button>
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='left'
                    className='bg-lightgrey '
                >
                    <div className='py-[20px] flex flex-col gap-[40px] bg-[#6d6d6d] px-[20px] h-full'>

                        <div className="basis-[60%] mx-auto">
                            <div className="max-h-[380px] w-[80px] bg-grey rounded-[45px] text-center">
                                <NavLink to="/">
                                    <Button className="bg-transparent my-[10px] rounded-[28px] w-[56px] h-[56px] btn-flips hover:bg-primary">
                                        <img src={assets.images.slIcon} alt="icon" className="w-[24px]" />
                                    </Button>
                                </NavLink>
                                <NavLink to="/gallery">
                                    <Button className="bg-transparent my-[10px] rounded-[28px] w-[56px] h-[56px] btn-flips hover:bg-primary">
                                        <img src={assets.images.photoIcon} alt="icon" className="w-[24px]" />
                                    </Button>
                                </NavLink>
                                <NavLink to="/plans">
                                    <Button className="bg-transparent my-[10px] rounded-[28px] w-[56px] h-[56px] btn-flips hover:bg-primary">
                                        <img src={assets.images.clipboardIcon} alt="icon" className="w-[24px]" />
                                    </Button>
                                </NavLink>
                                <Button className="bg-transparent my-[10px] rounded-[28px] w-[56px] h-[56px] btn-flips hover:bg-primary">
                                    <img src={assets.images.startegyIcon} alt="icon" className="w-[24px]" />
                                </Button>
                                <Button className="bg-transparent my-[10px] rounded-[28px] w-[56px] h-[56px] btn-flips hover:bg-primary">
                                    <img src={assets.images.busnessIcon} alt="icon" className="w-[24px]" />
                                </Button>
                            </div>
                        </div>
                        <div className="basis-[20%] text-center">
                            <Button className="bg-transparent my-[10px] rounded-[28px] w-[56px] h-[56px] p-0">
                                <img src={assets.images.avatar1} alt="icon" className="max-w-full w-full h-full object-contain" />
                            </Button>
                            <Button onClick={handleLogout} className="bg-grey my-[10px] rounded-[28px] w-[56px] h-[56px] btn-flips">
                                <img src={assets.images.logoutIcon} alt="icon" className="w-[24px]" />
                            </Button>
                        </div>
                    </div>
                </Drawer>
            </div>

        </>

    )
}

export default Sidebar