import assets from "@/assets";
import ViewApp from "@/components/common/Viewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectAttachment } from "@/interfaces/project-attachments";
import { fetchProjectAttachments } from "@/redux/features/projectAttachmentsSlice";
import { fetchProjectPlans } from "@/redux/features/projectPlanSlice";
import { fetchProjects, setSelectedProject } from "@/redux/features/projectSlice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const GalleryScreen = () => {

    const dispatch = useAppDispatch();
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [allImages, setAllImages] = useState<ProjectAttachment[]>([]);

    const { projects, selectedProjects } = useAppSelector(s => s.projectState);
    const { attachments } = useAppSelector(s => s.projectAttachmentsState);
    const fetchProjectsData = () => {
        dispatch(fetchProjects({}));
    }

    const { tab = '3d' } = useParams();


    useEffect(() => {
        fetchProjectsData();
    }, [])

    useEffect(() => {
        if (projects.length > 0 && !selectedProjects) {
            dispatch(setSelectedProject(projects[0]))
        }
        if (selectedProjects) {

            dispatch(fetchProjectPlans({ project_id: selectedProjects.id }))
            dispatch(fetchProjectAttachments({ project_id: selectedProjects.id }))
        }
    }, [projects, selectedProjects, dispatch]);

    const openImageViewer = useCallback((index: number, type = "3d") => {
        if (type === "3d") {
            console.log("🚀 ~ openImageViewer ~ type:", type)
            setAllImages(attachments.filter(a => a.attachmentType === "image" && a.category === "3d"));
        }
        else if ('blue') {
            setAllImages(attachments.filter(a => a.attachmentType === "image" && a.category !== "3d"));

        }
        setCurrentImage(index);

        setIsViewerOpen(true);
    }, []);



    return (
        <>
            <div className=" p-2 max-[1024px]:px-[40px] max-[768px]:p-0">
                {isViewerOpen &&
                    <ViewApp
                        isViewerOpen={isViewerOpen}
                        setIsViewerOpen={setIsViewerOpen}
                        setCurrentImage={setCurrentImage}
                        currentImage={currentImage}
                        images={allImages}
                    />
                }
                <div className="text-[28px] text-secondary mb-5 max-[576px]:text-center">
                    Gallery
                </div>
                <div className="bg-white  rounded-[20px]">
                    <Tabs defaultValue={tab} className="w-full ">
                        <div className="max-[576px]:overflow-y-hidden max-[490px]:overflow-x-scroll tabs--head">
                            <TabsList className="w-full justify-start p-0 max-[490px]:w-[580px]">
                                <TabsTrigger value="3d" className="ne-tabs min-w-[184px] rounded-t-[20px] h-auto p-[12px] max-[768px]:min-w-[148px] max-[576px]:text-[16px]">3d renderers</TabsTrigger>
                                <TabsTrigger value="blueprints" className="ne-tabs min-w-[184px] rounded-t-[20px] h-auto  shadow-none p-[12px] max-[768px]:min-w-[148px] max-[576px]:text-[16px]">blueprints</TabsTrigger>
                                <TabsTrigger value="report" className="ne-tabs min-w-[184px] rounded-t-[20px] h-auto  shadow-none p-[12px] max-[768px]:min-w-[148px] max-[576px]:text-[16px]">Approvals & Reports</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="3d" className="m-0">

                            <div className="flex justify-start flex-wrap gap-[15px] p-5 ">

                                {attachments.filter(a => a.attachmentType === "image" && a.category === "3d").map((image, i) => {
                                    return (
                                        <div onClick={() => openImageViewer(i, "3d")} key={i} className="basis-[20%] my-4 ">
                                            <div className="w-[210px] h-[210px] mb-3 rounded-[20px] border-[#e3e3e3] border-[1px] mx-auto cursor-pointer">
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
                        <TabsContent value="blueprints" className="m-0">

                            <div className="flex justify-start flex-wrap gap-[15px] p-5 ">

                                {attachments.filter(a => a.attachmentType === "image" && a.category !== "3d").map((image, i) => {
                                    return (
                                        <div key={i} onClick={() => openImageViewer(i, "blue")} className="basis-[20%] my-4">
                                            <div className="w-[210px] h-[210px] mb-3 rounded-[20px] border-[#e3e3e3] border-[1px] mx-auto cursor-pointer">
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
                                                <div className="w-[210px] h-[210px] mb-3 rounded-[20px] border-[#e3e3e3] border-[1px] mx-auto cursor-pointer">
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