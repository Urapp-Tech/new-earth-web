import assets from "@/assets"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { fetchProjectAttachments } from "@/redux/features/projectAttachmentsSlice"
import { fetchProjectPlans } from "@/redux/features/projectPlanSlice"
import { fetchProjects, setSelectedProject } from "@/redux/features/projectSlice"
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

const MainScreen = () => {

    const dispatch = useAppDispatch();
    const [video, setVideo] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [doc, setDoc] = useState<string | null>(null);
    const { projects, selectedProjects } = useAppSelector(s => s.projectState);
    const { attachments } = useAppSelector(s => s.projectAttachmentsState);

    const fetchProjectsData = () => {
        dispatch(fetchProjects({}));
    }

    useEffect(() => {
        fetchProjectsData();
    }, [dispatch])

    useEffect(() => {
        if (projects.length > 0 && !selectedProjects) {
            dispatch(setSelectedProject(projects[0]))
        }
        if (selectedProjects) {

            dispatch(fetchProjectPlans({ project_id: selectedProjects.id }))
            dispatch(fetchProjectAttachments({ project_id: selectedProjects.id }))
        }
    }, [projects, selectedProjects, dispatch])


    const setLastVideo = () => {
        const lastVideo = attachments
            .filter((attachment) => attachment.attachmentType === 'video')
            .sort((a, b) => {
                const dateA = new Date(a.uploadedAt).getTime();
                const dateB = new Date(b.uploadedAt).getTime();
    
                return dateB - dateA; // Sort in descending order (latest first)
            })
            .shift(); // Get the first (latest) video
    
        if (lastVideo) {
            setVideo(lastVideo.filePath);
        } else {
            setVideo(null);
        }
    };
    const setLastImage = () => {
        const lastVideo = attachments.find((attachment) => attachment.attachmentType === 'image' && attachment.category === '3d');
        if (lastVideo) {
            setImage(lastVideo.filePath)
        }
        else {
            setImage(null)
        }
    }
    const setLastDoc = () => {
        const lastVideo = attachments.find((attachment) => attachment.attachmentType === 'image' && attachment.category !== '3d');
        if (lastVideo) {
            setDoc(lastVideo.filePath)
        }
        else {
            setDoc(null)
        }
    }

    useEffect(() => {
        setLastVideo();
        setLastImage();
        setLastDoc();
    }, [attachments]);

    return (
        <>
            <div className="flex gap-3  rounded-[40px]">
                <div className="basis-[50%]">

                    <div className="max-w-[656px]">
                        <div className="flex justify-between items-center mb-2 px-4">
                            <span className="block text-[16px] font-medium leading-normal text-secondary mb-2 capitalize">Most recent video</span>
                            <NavLink to="videos" className="block text-[14px] font-medium leading-normal text-secondary underline capitalize">see all</NavLink>
                        </div>
                        {video ?
                            <video className="w-full h-full rounded-[20px]" controls >
                                <source src={video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            :
                            <img src={assets.images.noVideo} alt="video" className="w-full h-[400px] object-cover" />
                        }
                    </div>

                </div>
                <div className="basis-[50%]">
                    <div className="mb-2 px-4">

                        <span className="block text-[16px] font-medium leading-normal text-secondary capitalize mb-3">select project</span>
                        <Select value={selectedProjects?.id} onValueChange={(value) => dispatch(setSelectedProject(projects.find(x => x.id === value)))}>
                            <SelectTrigger className="ne-tabs w-full h-[60px] rounded-[36px] bg-white border-transparent focus:border-transparent focus:ring-0 border-0 border-none shadow-none">
                                <SelectValue className="px-3" placeholder="Select Projects">
                                    {projects.find((project) => project.id === selectedProjects?.id)?.name || "Select Projects"}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {projects &&
                                    projects.map((item, i) => (
                                        <SelectItem key={i} value={item.id}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>

                    </div>
                    <div className="flex justify-around items-center px-[5px]">
                        <div className="my-[10px]">
                            <NavLink to="/gallery">
                                <div className="flex gap-2 justify-center items-center mb-[15px]">
                                    <img src={assets.images.playIcon} alt="icons" className="w-[25px] h-[25px]" />

                                    <span className="text-[14px] font-bold text-secondary leading-normal">3D renders</span>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9" fill="none">
                                        <path d="M1 8.5L9 0.5M9 0.5H1M9 0.5V8.5" stroke="#14242E" />
                                    </svg>

                                </div>
                            </NavLink>
                            <div className=" text-center mx-auto h-[250px]">
                                {
                                    image ?
                                        <img src={image} alt="3D-image" className="w-full h-full object-contain ne-box-shade" />
                                        :
                                        <img src={assets.images.noFile} alt="3D-image" className="w-full h-full object-contain ne-box-shade" />
                                }
                            </div>
                        </div>
                        <div className="my-[10px]">
                            <NavLink to="/gallery/blueprints">
                                <div className="flex gap-2 justify-center items-center mb-[15px]">
                                    <img src={assets.images.playIcon} alt="icons" className="w-[25px] h-[25px]" />
                                    <span className="text-[14px] font-bold text-secondary leading-normal capitalize">project blueprints</span>
                                    <a href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9" fill="none">
                                            <path d="M1 8.5L9 0.5M9 0.5H1M9 0.5V8.5" stroke="#14242E" />
                                        </svg>
                                    </a>
                                </div>
                            </NavLink>
                            <div className="h-[250px] text-center mx-auto">
                                {
                                    doc ?
                                        <img src={doc} alt="3D-image" className="w-full h-full object-contain ne-box-shade" />
                                        :
                                        <img src={assets.images.blueprintNoFile} alt="3D-image" className="w-full h-full object-contain ne-box-shade" />
                                }
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
                        <div className="max-w-[250px] mb-2 text-[#EB5A00] text-[40px] leading-normal font-bold">
                            {import.meta.env.VITE_CURRENCY_SYMBOL} {selectedProjects?.budget}.
                            <span className="text-secondary opacity-[0.5]">00</span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <g opacity="0.5" clipPath="url(#clip0_44_143)">
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
                            {import.meta.env.VITE_CURRENCY_SYMBOL} {selectedProjects?.totalPaid}.
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
                            {import.meta.env.VITE_CURRENCY_SYMBOL} {selectedProjects?.dueAmount}.
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
                                <NavLink to="/plans" className="block text-[16px] font-medium leading-normal text-secondary underline capitalize">view details</NavLink>
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