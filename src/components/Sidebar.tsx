import assets from '@/assets';
import { logout } from '@/redux/features/authStateSlice';
import { setRemoveProject } from '@/redux/features/projectSlice';
import { useAppDispatch } from '@/redux/redux-hooks';
import React from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { NavLink, useNavigate } from 'react-router-dom';

import { Button } from './ui/button';
const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setRemoveProject());
    navigate('/auth/login');
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="fixed top-[30px] flex w-[10%] max-w-[100px] flex-col gap-[70px] bg-lightgrey px-[20px] max-[1024px]:w-[70px] max-[767.98px]:hidden">
        <div className="mx-auto basis-[60%]">
          <div className="basis-[10%] max-[768px]:basis-[20%] max-[576px]:basis-[10%]">
            <div className="max-w-[80px] pb-5 max-[992px]:max-w-[55px] max-[576px]:max-w-[50px] ">
              <img src={assets.images.logo} alt="logo" />
            </div>
          </div>
          <div className="max-h-[380px] w-[80px] rounded-[45px] bg-grey text-center">
            <NavLink to="/">
              <div>
                <Button className="btn-flips my-[12px] h-[56px] w-[56px] flex-col rounded-[28px] bg-transparent hover:bg-primary">
                  <img
                    src={assets.images.slIcon}
                    alt="icon"
                    className="w-[24px]"
                  />
                  <span className="block text-[10px] leading-[14px] text-secondary">
                    Home
                  </span>
                </Button>
              </div>
            </NavLink>
            <NavLink to="/gallery">
              <Button className="btn-flips my-[12px] h-[56px] w-[56px] flex-col rounded-[28px] bg-transparent hover:bg-primary">
                <img
                  src={assets.images.photoIcon}
                  alt="icon"
                  className="w-[24px]"
                />
                <span className="block text-[10px] leading-[14px] text-secondary">
                  Gallery
                </span>
              </Button>
            </NavLink>
            <NavLink to="/plans">
              <Button className="btn-flips my-[12px] h-[56px] w-[56px] flex-col rounded-[28px] bg-transparent hover:bg-primary">
                <img
                  src={assets.images.clipboardIcon}
                  alt="icon"
                  className="w-[24px]"
                />
                <span className="block text-[10px] leading-[14px] text-secondary">
                  Plans
                </span>
              </Button>
            </NavLink>
            <NavLink to="/project-quotations">
              <Button className="btn-flips my-[12px] h-[56px] w-[56px] flex-col rounded-[28px] bg-transparent hover:bg-primary">
                <img
                  src={assets.images.supplier}
                  alt="icon"
                  className="w-[24px]"
                />
                <span className="block text-[10px] leading-[14px] text-secondary">
                  Payment
                </span>
              </Button>
            </NavLink>
            {/* <Button className="btn-flips my-[12px] h-[56px] w-[56px] flex-col rounded-[28px] bg-transparent hover:bg-primary">
                <img
                  src={assets.images.busnessIcon}
                  alt="icon"
                  className="w-[24px]"
                />
              </Button> */}
          </div>
        </div>
        <div className="mx-3 basis-[20%] text-center">
          <Button
            onClick={handleLogout}
            className="btn-flips my-[10px] h-[56px] w-[56px] rounded-[28px] bg-grey"
          >
            <img
              src={assets.images.logoutIcon}
              alt="icon"
              className="w-[24px]"
            />
          </Button>
        </div>
      </div>
      {/* drawer */}
      <div className="side-draw flex w-[10%] max-w-[100px] flex-col gap-[70px] bg-lightgrey px-[20px] max-[768px]:w-[15%] max-[576px]:absolute max-[576px]:left-[-8px] max-[576px]:top-[25px] max-[576px]:h-0">
        <button
          onClick={toggleDrawer}
          className="h-[40px] w-[40px] rounded-lg bg-white shadow-gray-800 max-[576px]:h-[30px] max-[576px]:w-[30px] min-[768px]:hidden "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 18H10"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M4 12L16 12"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M4 6L20 6"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="left"
          className="bg-lightgrey "
        >
          <div className="flex h-full flex-col gap-[40px] bg-[#6d6d6d] px-[20px] py-[20px]">
            <div className="mx-auto basis-[60%]">
              <div className="max-h-[380px] w-[80px] rounded-[45px] bg-grey text-center">
                <NavLink to="/">
                  <Button className="btn-flips my-[10px] h-[56px] w-[56px] rounded-[28px] bg-transparent hover:bg-primary">
                    <img
                      src={assets.images.slIcon}
                      alt="icon"
                      className="w-[24px]"
                    />
                  </Button>
                </NavLink>
                <NavLink to="/gallery">
                  <Button className="btn-flips my-[10px] h-[56px] w-[56px] rounded-[28px] bg-transparent hover:bg-primary">
                    <img
                      src={assets.images.photoIcon}
                      alt="icon"
                      className="w-[24px]"
                    />
                  </Button>
                </NavLink>
                <NavLink to="/plans">
                  <Button className="btn-flips my-[10px] h-[56px] w-[56px] rounded-[28px] bg-transparent hover:bg-primary">
                    <img
                      src={assets.images.clipboardIcon}
                      alt="icon"
                      className="w-[24px]"
                    />
                  </Button>
                </NavLink>
                <NavLink to="/project-quotations">
                  <Button className="btn-flips my-[10px] h-[56px] w-[56px] rounded-[28px] bg-transparent hover:bg-primary">
                    <img
                      src={assets.images.supplier}
                      alt="icon"
                      className="w-[24px]"
                    />
                  </Button>
                </NavLink>
                {/* <Button className="btn-flips my-[10px] h-[56px] w-[56px] rounded-[28px] bg-transparent hover:bg-primary">
                  <img
                    src={assets.images.startegyIcon}
                    alt="icon"
                    className="w-[24px]"
                  />
                </Button>
                <Button className="btn-flips my-[10px] h-[56px] w-[56px] rounded-[28px] bg-transparent hover:bg-primary">
                  <img
                    src={assets.images.busnessIcon}
                    alt="icon"
                    className="w-[24px]"
                  />
                </Button> */}
              </div>
            </div>
            <div className="basis-[20%] text-center">
              <Button
                onClick={handleLogout}
                className="btn-flips my-[10px] h-[56px] w-[56px] rounded-[28px] bg-grey"
              >
                <img
                  src={assets.images.logoutIcon}
                  alt="icon"
                  className="w-[24px]"
                />
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default Sidebar;
