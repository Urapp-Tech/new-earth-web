// import assets from '@/assets';
import ViewApp from '@/components/common/Viewer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectAttachment } from '@/interfaces/project-attachments';
import { fetchProjectAttachments } from '@/redux/features/projectAttachmentsSlice';
import {
  fetchProjects,
  setSelectedProject,
} from '@/redux/features/projectSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import dayjs from 'dayjs';
import { FileText } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GalleryScreen = () => {
  const dispatch = useAppDispatch();
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [allImages] = useState<ProjectAttachment[]>([]);

  const { projects, selectedProjects } = useAppSelector((s) => s.projectState);
  const { attachments } = useAppSelector((s) => s.projectAttachmentsState);
  const fetchProjectsData = () => {
    dispatch(fetchProjects({}));
  };

  const { tab = 'ImagesandVideos' } = useParams();

  useEffect(() => {
    fetchProjectsData();
  }, []);

  useEffect(() => {
    if (projects.length > 0 && !selectedProjects) {
      dispatch(setSelectedProject(projects[0]));
    }
  }, [projects]);

  useEffect(() => {
    if (selectedProjects) {
      dispatch(fetchProjectAttachments({ project_id: selectedProjects.id }));
    }
  }, [selectedProjects]);

  //   const openImageViewer = useCallback((index: number, type = '3d') => {
  //     if (type === '3d') {
  //       setAllImages(
  //         attachments.filter(
  //           (a) => a.attachmentType === 'image' && a.category === '3d'
  //         )
  //       );
  //     } else if ('blue') {
  //       setAllImages(
  //         attachments.filter(
  //           (a) => a.attachmentType === 'image' && a.category !== '3d'
  //         )
  //       );
  //     }
  //     setCurrentImage(index);

  //     setIsViewerOpen(true);
  //   }, []);

  return (
    <>
      <div className=" p-2 max-[1024px]:px-[40px] max-[768px]:p-0">
        {isViewerOpen && (
          <ViewApp
            isViewerOpen={isViewerOpen}
            setIsViewerOpen={setIsViewerOpen}
            setCurrentImage={setCurrentImage}
            currentImage={currentImage}
            images={allImages}
          />
        )}
        <div className="mb-5 text-[28px] text-secondary max-[576px]:text-center">
          Media Gallery
        </div>
        <div className="rounded-[20px]  bg-white">
          <Tabs defaultValue={tab} className="w-full ">
            <div className="tabs--head max-[768px]:overflow-y-hidden max-[768px]:overflow-x-scroll">
              <TabsList className="w-full justify-start p-0 max-[768px]:w-[780px]">
                <TabsTrigger
                  value="ImagesandVideos"
                  className="ne-tabs h-auto min-w-[184px] rounded-t-[20px] p-[12px] max-[768px]:min-w-[148px] max-[576px]:text-[16px]"
                >
                  Images and Videos
                </TabsTrigger>
                <TabsTrigger
                  value="3drendersandblueprints"
                  className="ne-tabs h-auto min-w-[184px] rounded-t-[20px]  p-[12px] shadow-none max-[768px]:min-w-[148px] max-[576px]:text-[16px]"
                >
                  3d-renders and blueprints
                </TabsTrigger>
                {/* <TabsTrigger
                  value="OtherDocs"
                  className="ne-tabs h-auto min-w-[184px] rounded-t-[20px]  p-[12px] shadow-none max-[768px]:min-w-[148px] max-[576px]:text-[16px]"
                >
                  Other Docs
                </TabsTrigger> */}
              </TabsList>
            </div>

            <TabsContent value="ImagesandVideos" className="m-0">
              <div className="flex flex-wrap justify-start gap-[15px] p-5 max-[576px]:justify-center">
                {attachments
                  .filter(
                    (a) =>
                      (a.attachmentType === 'image' ||
                        a.attachmentType === 'video') &&
                      a.category !== 'Blueprint' &&
                      a.category !== '3d'
                  )
                  .map((image, i) => {
                    return (
                      <div key={i} className="my-4 basis-[20%]">
                        <div className="mx-auto mb-3 h-[210px] w-[210px] cursor-pointer rounded-[20px] border-[1px] border-[#e3e3e3]">
                          {image.attachmentType === 'video' && (
                            <a href={image.filePath} rel="noopener noreferrer">
                              <video
                                className="h-full max-h-[250px] w-full max-w-[250px] rounded-[20px] object-cover"
                                controls
                              >
                                <source src={image.filePath} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </a>
                          )}
                          {image.attachmentType === 'image' && (
                            <a href={image.filePath} rel="noopener noreferrer">
                              <img
                                src={image.filePath}
                                alt="model"
                                className="h-full  w-full rounded-[20px] object-contain"
                              />
                            </a>
                          )}
                        </div>

                        <h5 className="my-2 text-center text-[16px] opacity-[0.5]">
                          {image.title}
                        </h5>
                        <h6 className="text-center">{image.day}</h6>
                      </div>
                    );
                  })}
              </div>
            </TabsContent>
            <TabsContent value="3drendersandblueprints" className="m-0">
              <div className="flex flex-wrap justify-start gap-[15px] p-5  max-[576px]:justify-center">
                {attachments
                  .filter(
                    (a) =>
                      (a.attachmentType === 'document' ||
                        a.attachmentType === 'image') &&
                      (a.category === '3d' || a.category === 'Blueprint')
                  )
                  .map((image, i) => {
                    return (
                      <div key={i} className="my-4 basis-[20%]">
                        <div className="mx-auto mb-3 h-[210px] w-[210px] cursor-pointer rounded-[20px] border-[1px] border-[#e3e3e3]">
                          <div className="flex h-full items-center justify-center">
                            <a href={image.filePath} rel="noopener noreferrer">
                              <FileText size={150} />
                            </a>
                          </div>
                          {/* <img
                            src={image.filePath}
                            alt="model"
                            className="h-full  w-full rounded-[20px] object-contain"
                          /> */}
                        </div>

                        <h5 className="text-center text-[16px] opacity-[0.5]">
                          {image.title}
                        </h5>
                        <h6 className="text-center text-sm">
                          {dayjs(image.uploadedAt).format('YYYY-MM-DD')}
                        </h6>
                      </div>
                    );
                  })}
              </div>
            </TabsContent>
            {/* <TabsContent value="OtherDocs" className="m-0">
              <div className="mb-3 flex min-h-[400px] flex-wrap justify-start  gap-[15px] p-5">
                {attachments
                  .filter((a) => a.attachmentType === 'document')
                  .map((doc, i) => {
                    return (
                      <div key={i} className="my-4 basis-[20%]">
                        <a href={doc.filePath} target="_blank">
                          <div className="mx-auto mb-3 h-[210px] w-[210px] cursor-pointer rounded-[20px] border-[1px] border-[#e3e3e3]">
                            <img
                              src={assets.images.doc}
                              alt="model"
                              className="h-full  w-full rounded-[20px] object-contain"
                            />
                          </div>
                          <h5 className="my-2 text-center text-[16px] opacity-[0.5]">
                            {doc.title}
                          </h5>
                          <h6 className="text-center">{doc.day}</h6>
                        </a>
                      </div>
                    );
                  })}
              </div>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default memo(GalleryScreen);
