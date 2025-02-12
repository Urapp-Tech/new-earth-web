// import assets from '@/assets';
import ViewApp from '@/components/common/Viewer';
import CustomCard from '@/components/ImageBox';
import ImagePreview from '@/components/PreviewImageBox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectAttachment } from '@/interfaces/project-attachments';
import {
  fetchProjectAttachments,
  fetchProjectDaywiseAttachments,
} from '@/redux/features/projectAttachmentsSlice';
import {
  fetchProjects,
  setSelectedProject,
} from '@/redux/features/projectSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { memo, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const GalleryScreen = () => {
  const dispatch = useAppDispatch();
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [allImages] = useState<ProjectAttachment[]>([]);
  const [isPreview, setIsPreview] = useState<{
    state: boolean;
    source: string;
  }>({ state: false, source: '' });

  const { projects, selectedProjects } = useAppSelector((s) => s.projectState);
  const { attachments } = useAppSelector((s) => s.projectAttachmentsState);
  const { daywiseAttachments } = useAppSelector(
    (s) => s.projectAttachmentsState
  );
  const fetchProjectsData = () => {
    dispatch(fetchProjects({}));
  };
  const { state } = useLocation();
  const { tab = state?.tab || 'ImagesandVideos' } = useParams();

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
      dispatch(
        fetchProjectDaywiseAttachments({ project_id: selectedProjects.id })
      );
      dispatch(fetchProjectAttachments({ project_id: selectedProjects.id }));
    }
  }, [selectedProjects]);

  console.log('daywiseAttachments', daywiseAttachments);

  return (
    <>
      <div className="h-screen p-2 max-[1024px]:px-[40px] max-[768px]:p-0">
        {isViewerOpen && (
          <ViewApp
            isViewerOpen={isViewerOpen}
            setIsViewerOpen={setIsViewerOpen}
            setCurrentImage={setCurrentImage}
            currentImage={currentImage}
            images={allImages}
          />
        )}
        {isPreview?.state && (
          <ImagePreview
            open={isPreview.state}
            setOpen={setIsPreview}
            src={isPreview.source}
          />
        )}
        <div className="mb-5 text-[28px] text-secondary max-[576px]:text-center">
          Media Gallery
        </div>
        <div className="rounded-[20px]  bg-white">
          <Tabs defaultValue={tab} className="w-full ">
            <div className="tabs--head max-[768px]:overflow-y-hidden max-[768px]:overflow-x-scroll">
              <TabsList className="w-full justify-start p-0 max-[768px]:w-[780px] max-[576px]:w-[600px] max-[400px]:w-[500px]">
                <TabsTrigger
                  value="ImagesandVideos"
                  className="ne-tabs h-auto min-w-[184px] rounded-t-[20px] p-[12px] max-[768px]:min-w-[148px] max-[576px]:text-[16px] max-[480px]:text-[13px]"
                >
                  Images and Videos
                </TabsTrigger>
                <TabsTrigger
                  value="3drendersandblueprints"
                  className="ne-tabs h-auto min-w-[184px] rounded-t-[20px]  p-[12px] shadow-none max-[768px]:min-w-[148px] max-[576px]:text-[16px] max-[480px]:text-[13px]"
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
              {daywiseAttachments?.length ? (
                daywiseAttachments
                  ?.filter(
                    (f: any) => f.day !== 'ALL_3D' && f.day !== 'ALL_BLUEPRINTS'
                  )
                  ?.sort((a: any, b: any) => {
                    const dayA = parseInt(a.day.replace(/\D/g, ''), 10);
                    const dayB = parseInt(b.day.replace(/\D/g, ''), 10);
                    return dayA - dayB;
                  })
                  ?.map((x: any) => {
                    return (
                      <div className="mt-4 basis-[19%]">
                        <div className="px-5 py-2">
                          <span className="rounded-full border-[1px] border-secondary px-6 py-2 text-secondary">
                            {x.day}
                          </span>
                        </div>
                        <div className="flex flex-wrap justify-start gap-[15px] px-5 max-[576px]:justify-center">
                          {x.dayItems
                            .filter(
                              (a: any) =>
                                (a.attachmentType === 'image' ||
                                  a.attachmentType === 'video') &&
                                a.category !== 'Blueprint' &&
                                a.category !== '3d'
                            )
                            .map((image: any, i: number) => {
                              return (
                                <div
                                  key={i}
                                  className="mt-4 basis-[15%] 2xl:basis-[12%]"
                                >
                                  <div className="mx-auto mb-3 cursor-pointer">
                                    {image.attachmentType === 'video' && (
                                      <a
                                        href={image.filePath}
                                        rel="noopener noreferrer"
                                      >
                                        <video
                                          className="h-full max-h-[194px] min-h-[194px] w-full min-w-[200px] rounded-[20px] object-cover"
                                          controls
                                        >
                                          <source
                                            src={image.filePath}
                                            type="video/mp4"
                                          />
                                          Your browser does not support the
                                          video tag.
                                        </video>
                                      </a>
                                    )}
                                    {image.attachmentType === 'image' && (
                                      <CustomCard
                                        item={{
                                          filePath: image.filePath,
                                        }}
                                        setIsPreview={setIsPreview}
                                        cardHeight="h-[200px]"
                                      />
                                      // <a href={image.filePath} rel="noopener noreferrer">
                                      // <img
                                      //   onClick={() =>
                                      //     setIsPreview({
                                      //       state: true,
                                      //       source: image.filePath,
                                      //     })
                                      //   }
                                      //   src={image.filePath}
                                      //   alt="model"
                                      //   className="h-full  w-full rounded-[20px] object-contain"
                                      // />
                                      // </a>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="p-7">
                  <span>Images and Videos not uploaded yet.</span>
                </div>
              )}
            </TabsContent>
            <TabsContent value="3drendersandblueprints" className="m-0">
              <div className="flex flex-wrap justify-start gap-[13px] px-5 py-3 max-[576px]:justify-center 2xl:gap-[1px]">
                {attachments?.length ? (
                  attachments
                    .filter(
                      (a: any) =>
                        (a.attachmentType === 'document' ||
                          a.attachmentType === 'image') &&
                        (a.category === '3d' || a.category === 'Blueprint')
                    )
                    .map((image: any, i: number) => {
                      return (
                        <div
                          key={i}
                          className="mt-4 basis-[19%] 2xl:basis-[12%]"
                        >
                          <div className="mx-auto h-[210px] w-[200px] cursor-pointer rounded-[20px]">
                            <div className="flex h-full items-center justify-center">
                              <CustomCard
                                item={{
                                  filePath: image.filePath,
                                  attachmentType: image.attachmentType,
                                }}
                                setIsPreview={setIsPreview}
                                cardHeight="h-[200px]"
                              />
                              {/* {image.attachmentType === 'document' ? (
                              <a
                                href={image.filePath}
                                rel="noopener noreferrer"
                              >
                                <FileText size={150} />
                              </a>
                            ) : (
                              image.attachmentType === 'image' && (
                                <CustomCard
                                  item={{
                                    filePath: image.filePath,
                                    attachmentType: image.attachmentType,
                                  }}
                                  cardHeight="h-[200px]"
                                />
                                // <img
                                //   onClick={() =>
                                //     setIsPreview({
                                //       state: true,
                                //       source: image.filePath,
                                //     })
                                //   }
                                //   src={image.filePath}
                                //   alt="model"
                                //   className="h-full w-full object-contain"
                                // />
                              )
                            )} */}
                            </div>
                            {/* <img
                            src={image.filePath}
                            alt="model"
                            className="h-full  w-full rounded-[20px] object-contain"
                          /> */}
                          </div>

                          {/* <h5 className="text-center text-[16px] opacity-[0.5]">
                          {image.title}
                        </h5>
                        <h6 className="text-center text-sm">
                          {dayjs(image.uploadedAt).format('YYYY-MM-DD')}
                        </h6> */}
                        </div>
                      );
                    })
                ) : (
                  <div className="p-7">
                    <span>3d Renders and Blueprints not uploaded yet.</span>
                  </div>
                )}
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
