import assets from "@/assets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchProjectAttachments } from "@/redux/features/projectAttachmentsSlice";
import { fetchProjectPlans } from "@/redux/features/projectPlanSlice";
import { fetchProjects, setSelectedProject } from "@/redux/features/projectSlice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { useEffect } from "react";



const GalleryScreen = () => {

    const dispatch = useAppDispatch();

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

    return (
        <>
            <div className=" p-2">
                <div className="text-[28px] text-secondary mb-5">
                    Gallery
                </div>
                <div className="bg-white  rounded-[20px]">
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className="w-full justify-start p-0">
                            <TabsTrigger value="account" className="ne-tabs min-w-[184px] rounded-t-[20px] h-auto p-[12px]">3d renderers</TabsTrigger>
                            <TabsTrigger value="password" className="ne-tabs min-w-[184px] rounded-t-[20px] h-auto  shadow-none p-[12px]">blueprints</TabsTrigger>
                            <TabsTrigger value="report" className="ne-tabs min-w-[184px] rounded-t-[20px] h-auto  shadow-none p-[12px]">Approvals & Reports</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account" className="m-0">

                            <div className="flex justify-start flex-wrap gap-[15px] p-5 ">

                                {attachments.filter(a => a.attachmentType === "image").map((image, i) => {
                                    return (
                                        <div key={i} className="basis-[20%] my-4">
                                            <div className="w-[210px] h-[210px] mb-3 rounded-[20px] border-[#e3e3e3] border-[1px] mx-auto">
                                                <img src={image.filePath} alt="model" className="rounded-[20px]  object-contain w-full h-full" />
                                            </div>

                                            <h5 className="text-center my-2 opacity-[0.5] text-[16px]">
                                                {image.title}

                                            </h5>
                                            <h6 className="text-center">
                                                {image.day}
                                            </h6>
                                        </div>
                                    )
                                })}

                            </div>

                        </TabsContent>
                        <TabsContent value="password" className="m-0">

                            <div className="flex justify-start flex-wrap gap-[15px] p-5 ">

                                {attachments.filter(a => a.attachmentType === "image").map((image, i) => {
                                    return (
                                        <div key={i} className="basis-[20%] my-4">
                                            <div className="w-[210px] h-[210px] mb-3 rounded-[20px] border-[#e3e3e3] border-[1px] mx-auto">
                                                <img src={image.filePath} alt="model" className="rounded-[20px]  object-contain w-full h-full" />
                                            </div>

                                            <h5 className="text-center my-2 opacity-[0.5] text-[16px]">
                                                {image.title}

                                            </h5>
                                            <h6 className="text-center">
                                                {image.day}
                                            </h6>
                                        </div>
                                    )
                                })}

                            </div>
                        </TabsContent>
                        <TabsContent value="report" className="m-0">

                            <div className="flex justify-start flex-wrap gap-[15px] p-5  min-h-[400px] mb-3">
                                {attachments.filter(a => a.attachmentType === "document").map((doc, i) => {
                                    return (
                                        <div key={i} className="basis-[20%] my-4">
                                            <a href={doc.filePath} target="_blank">
                                                <div className="w-[210px] h-[210px] mb-3 rounded-[20px] border-[#e3e3e3] border-[1px] mx-auto">
                                                    <img src={assets.images.doc} alt="model" className="rounded-[20px]  object-contain w-full h-full" />
                                                </div>
                                                <h5 className="text-center my-2 opacity-[0.5] text-[16px]">
                                                    {doc.title}

                                                </h5>
                                                <h6 className="text-center">
                                                    {doc.day}
                                                </h6>
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>
                        </TabsContent>
                    </Tabs>

                </div>
            </div>
        </>
    )
}

export default GalleryScreen