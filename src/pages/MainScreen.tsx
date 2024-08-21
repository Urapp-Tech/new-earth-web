import assets from "@/assets"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const MainScreen = () => {
    return (
        <>
            <div className="flex gap-3  rounded-[40px]">
                <div className="basis-[50%]">

                    <div className="max-w-[656px]">
                        <div className="flex justify-between items-center mb-2 px-4">
                            <span className="block text-[16px] font-medium leading-normal text-secondary capitalize">Most recent video</span>
                            <a href="#" className="block text-[14px] font-medium leading-normal text-secondary underline capitalize">see all</a>
                        </div>
                        <img src={assets.images.videoThumb} alt="video" className="w-full h-full" />
                    </div>

                </div>
                <div className="basis-[50%]">
                    <div className="mb-2 px-4">

                        <span className="block text-[16px] font-medium leading-normal text-secondary capitalize mb-3">select project</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-full max-w-[268px] h-[60px] rounded-[36px] bg-white ring-0 border-none shadow-none">Open</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                    <div className="flex justify-around items-center px-[5px]">
                        <div className="my-[10px]">
                            <div className="flex gap-2 justify-center items-center ">
                                <img src={assets.images.playIcon} alt="icons" className="w-[25px] h-[25px]" />
                                <span className="text-[14px] font-bold text-secondary leading-normal">3D renders</span>
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9" fill="none">
                                        <path d="M1 8.5L9 0.5M9 0.5H1M9 0.5V8.5" stroke="#14242E" />
                                    </svg>
                                </a>
                            </div>
                            <div className=" text-center mx-auto h-[250px]">
                                <img src={assets.images.banner1} alt="3D-image" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div className="my-[10px]">
                            <div className="flex gap-2 justify-center items-center ">
                                <img src={assets.images.playIcon} alt="icons" className="w-[25px] h-[25px]" />
                                <span className="text-[14px] font-bold text-secondary leading-normal capitalize">project documentation</span>
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9" fill="none">
                                        <path d="M1 8.5L9 0.5M9 0.5H1M9 0.5V8.5" stroke="#14242E" />
                                    </svg>
                                </a>
                            </div>
                            <div className="h-[250px] text-center mx-auto">
                                <img src={assets.images.banner2} alt="3D-image" className="w-full h-full object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex mt-4 min-h-[410px] ">
                <div className="basis-[40%]">
                    <div className="bg-ban-two p-5">
                        <div className="max-w-[200px] py-2 text-secondary text-[24px] leading-normal font-medium">
                            Total investment plan
                        </div>
                        <div className="max-w-[200px] mb-2 text-[#EB5A00] text-[40px] leading-normal font-bold">
                            $53,154.
                            <span className="text-secondary opacity-[0.5]">00</span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <g opacity="0.5" clip-path="url(#clip0_44_143)">
                                    <path d="M10 7.33331V3.33331L8 1.33331L6 3.33331V4.66665H2V14H14V7.33331H10ZM4.66667 12.6666H3.33333V11.3333H4.66667V12.6666ZM4.66667 9.99998H3.33333V8.66665H4.66667V9.99998ZM4.66667 7.33331H3.33333V5.99998H4.66667V7.33331ZM8.66667 12.6666H7.33333V11.3333H8.66667V12.6666ZM8.66667 9.99998H7.33333V8.66665H8.66667V9.99998ZM8.66667 7.33331H7.33333V5.99998H8.66667V7.33331ZM8.66667 4.66665H7.33333V3.33331H8.66667V4.66665ZM12.6667 12.6666H11.3333V11.3333H12.6667V12.6666ZM12.6667 9.99998H11.3333V8.66665H12.6667V9.99998Z" fill="#14242E" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_44_143">
                                        <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span className="text-[14px] font-medium leading-normal text-secondary">
                                Skyline Heights
                            </span>
                        </div>
                        <div className="flex gap-1 items-center mt-4">

                            <span className="text-[14px] font-medium leading-normal text-secondary capitalize ">
                                Total paid
                            </span>

                        </div>
                        <div className="max-w-[200px] mb-2 text-[#EB5A00] text-[24px] leading-normal font-bold">
                            $33,154.
                            <span className="text-secondary opacity-[0.5]">00</span>
                        </div>
                        <div className="flex gap-2 items-center mt-4">

                            <span className="text-[14px] font-medium leading-normal text-secondary capitalize ">
                                Due amount
                            </span>
                            <span className="text-[14px] font-medium leading-normal text-secondary capitalize ">
                                27th June 2024
                            </span>

                        </div>
                        <div className="max-w-[200px] mb-4 text-[#EB5A00] text-[24px] leading-normal font-bold">
                            $20,000.
                            <span className="text-secondary opacity-[0.5]">00</span>
                        </div>
                    </div>
                </div>
                <div className="basis-[60%] px-4 py-2">
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex-1 bg-ban-three min-h-[400px] p-6 ">
                            <div className="flex justify-between items-center">
                                <div className=" text-[24px] font-medium leading-normal text-white">
                                    Project Plan
                                </div>
                                <a href="#" className="block text-[16px] font-medium leading-normal text-secondary underline capitalize">view details</a>
                            </div>

                        </div>
                        <div className="flex-1 bg-white min-h-[400px] p-6 rounded-[50px]">
                            <div className="flex justify-between items-center">
                                <div className=" text-[24px] font-medium leading-normal text-secondary mb-2">
                                    Milestones
                                </div>
                                <a href="#" className="block text-[16px] font-medium leading-normal text-secondary underline capitalize">view details</a>
                            </div>
                            <div className="w-[269px] h-[59px] border-2 border-primary rounded-[50px] my-3">
                                <div className="block w-[70%] h-full bg-primary rounded-[50px]">
                                    <span className="block text-white   w-[120px]  text-[16px] font-bold px-5 leading-normal py-2">
                                        Demolition
                                    </span>

                                </div>
                            </div>
                            <div className="w-[269px] h-[59px] border-2 border-primary rounded-[50px] my-3">
                                <div className="block w-[90%] h-full bg-primary rounded-[50px]">
                                    <span className="block text-white   w-[120px]  text-[16px] font-bold px-5 leading-normal py-2">
                                        Construction
                                    </span>

                                </div>
                            </div>
                            <div className="w-[269px] h-[59px] border-2 border-primary rounded-[50px] my-3">
                                <div className="block w-[50%] h-full bg-primary rounded-[50px]">
                                    <span className="block text-white   w-[120px]  text-[16px] font-bold px-5 leading-normal py-2">
                                        Finishing
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div></>
    )
}

export default MainScreen