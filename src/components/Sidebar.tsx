import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import assets from "../assets"
import { useAppDispatch } from "@/redux/redux-hooks";
import { logout } from "@/redux/features/authStateSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth/login');
    };

    return (
        <>
            <div className=' w-[10%] max-w-[100px] flex flex-col gap-[70px] bg-lightgrey px-[20px]'>

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

        </>

    )
}

export default Sidebar