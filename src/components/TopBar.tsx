import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/redux/redux-hooks"
import dayjs from "dayjs"
import assets from "../assets"

const TopBar = () => {

    const { user } = useAppSelector(s => s.authState)

    return (
        <div className='bg-lightgrey'>
            <div className='w-full p-5 flex items-center justify-between max-[1024px]:gap-[15px] max-[576px]:flex-wrap max-[576px]:justify-center'>
                <div className='basis-[10%] max-[576px]:basis-[15%]'>
                    <div className="max-w-[80px]">
                        <img src={assets.images.logo} alt="logo" />
                    </div>

                </div>
                <div className='basis-[40%] max-[1024px]:basis-[25%]'>
                    <span className='block text-[32px] text-secondary font-medium leading-normal capitalize'>{user?.firstName ?? ''}</span>
                    <span className='block text-[14px] text-secondary font-medium leading-normal capitalize'>good morning</span>
                </div>
                <div className="basis-[50%] max-[1024px]:basis-[65%]">
                    <div className="  flex justify-between items-center gap-4 max-[480px]:gap-0">

                        <div className="w-full max-[768px]:hidden">
                            <Input type="search" placeholder="Search" className="ne-tabs w-full outline-none border-none focus-visible:ring-0 rounded-[20px] hidden" />
                        </div>
                        <div className="px-2">
                            <Button className="w-[40px] h-[40px] rounded-[20px] bg-white p-2 hover:bg-[#ccc]">
                                <img src={assets.images.bellIcon} alt="bellIcon" className="w-full h-full object-contain" />
                            </Button>
                        </div>
                        <div className="px-2">
                            <div className="w-[100px] h-[40px] rounded-[20px] bg-white p-2 hover:bg-[#ccc] text-center">
                                <span className="block text-[12px] font-medium leading-normal text-secondary">12:20 PM</span>
                            </div>
                        </div>
                        <div className="px-2">
                            <div className="w-[100px]  rounded-[20px]  text-center">
                                <span className="block text-[10px] font-medium leading-normal text-secondary capitalize w-full text-left">{dayjs().format('d MMM, dddd')}  </span>
                                <div className=" flex justify-between gap-1 items-end">
                                    <span className="block max-w-[50px] text-secondary text-[14px] leading-normal font-medium">
                                        Cloudy 30℃
                                    </span>
                                    <img src={assets.images.cloudIcon} alt="icon" className="w-[30px] h-[30px]" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default TopBar