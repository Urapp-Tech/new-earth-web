import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/redux/redux-hooks';
import assets from '../assets';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const TopBar = () => {
  const { user } = useAppSelector((s) => s.authState);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="bg-lightgrey">
      <div className="flex w-full items-center justify-between p-5 max-[1024px]:gap-[15px] max-[576px]:flex-wrap max-[576px]:justify-center">
        <div className="basis-[10%] max-[768px]:basis-[20%] max-[576px]:basis-[15%]">
          <div className="max-w-[80px]">
            <img src={assets.images.logo} alt="logo" />
          </div>
        </div>
        <div className="basis-[40%] max-[1024px]:basis-[25%] max-[768px]:basis-[50%] max-[460px]:basis-[40%]">
          <span className="block text-[32px] font-medium capitalize leading-normal text-secondary">
            {user?.firstName ?? ''}
          </span>
        </div>
        <div className="basis-[50%] max-[1024px]:basis-[65%] max-[768px]:basis-[30%]">
          <div className="  flex items-center justify-between gap-4 max-[576px]:gap-0">
            <div className="w-full max-[768px]:hidden">
              <Input
                type="search"
                placeholder="Search"
                className="ne-tabs hidden w-full rounded-[20px] border-none outline-none focus-visible:ring-0"
              />
            </div>
            <div className="px-2">
              <Button className="h-[40px] w-[40px] rounded-[20px] bg-white p-2 hover:bg-[#ccc]">
                <img
                  src={assets.images.bellIcon}
                  alt="bellIcon"
                  className="h-full w-full object-contain"
                />
              </Button>
            </div>
            <div className="px-2">
              <div className="h-[40px] w-[100px] rounded-[20px] bg-white p-[10px] text-center hover:bg-[#ccc]">
                <span className="block text-[12px] font-medium leading-normal text-secondary">
                  {dayjs(time).format('hh:mm A')}
                </span>
              </div>
            </div>
            {/* <div className="px-2">
                            <div className="w-[100px]  rounded-[20px]  text-center">
                                <span className="block text-[10px] font-medium leading-normal text-secondary capitalize w-full text-left">{dayjs().format('d MMM, dddd')}  </span>
                                <div className=" flex justify-between gap-1 items-end">
                                    <span className="block max-w-[50px] text-secondary text-[14px] leading-normal font-medium">
                                        Cloudy 30℃
                                    </span>
                                    <img src={assets.images.cloudIcon} alt="icon" className="w-[30px] h-[30px]" />
                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
