import assets from '@/assets';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchProjectAttachments } from '@/redux/features/projectAttachmentsSlice';
import { fetchProjectDashboard } from '@/redux/features/projectDashboardSlice';
import {
  fetchProjects,
  setSelectedProject,
} from '@/redux/features/projectSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { CURRENCY } from '@/utils/constant';
import { formatCurrency } from '@/utils/helpers';
// import { Progress } from '@/components/ui/progress';
import dayjs from 'dayjs';
import { FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const MainScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.authState);
  const [video, setVideo] = useState<any>(null);
  const [dImage, setdImage] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [_doc, setDoc] = useState<string | null>(null);
  const { projects, selectedProjects } = useAppSelector((s) => s.projectState);
  const { attachments } = useAppSelector((s) => s.projectAttachmentsState);
  const { dashboard } = useAppSelector((s) => s.projectdashboardState);

  const fetchProjectsData = () => {
    dispatch(fetchProjects({}));
  };

  useEffect(() => {
    fetchProjectsData();
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0 && selectedProjects?.id === null) {
      dispatch(setSelectedProject(projects[0]));
    }
  }, [projects]);

  console.log('selectedProjects', selectedProjects);

  useEffect(() => {
    if (selectedProjects) {
      dispatch(fetchProjectAttachments({ project_id: selectedProjects.id }));
      dispatch(fetchProjectDashboard({ projectId: selectedProjects?.id }));
    }
  }, [selectedProjects]);

  //   const fetchProjectActivityData = () => {
  //     if (selectedProjects) {
  //       dispatch(fetchProjectDashboard({ projectId: selectedProjects?.id }));
  //     }
  //   };

  const setLastVideo = () => {
    const lastVideo: any = attachments
      .filter(
        (attachment: any) =>
          attachment.attachmentType === 'video' &&
          attachment.category !== '3d' &&
          attachment.category !== 'Blueprint'
      )
      .sort((a, b) => {
        const dateA = new Date(a.uploadedAt).getTime();
        const dateB = new Date(b.uploadedAt).getTime();

        return dateB - dateA; // Sort in descending order (latest first)
      })
      .shift(); // Get the first (latest) video

    if (lastVideo) {
      setVideo(lastVideo);
    } else {
      setVideo(null);
    }
  };
  const setLastImage = () => {
    const lastVideo: any = attachments
      .filter(
        (attachment: any) =>
          attachment.attachmentType === 'image' &&
          attachment.category !== '3d' &&
          attachment.category !== 'Blueprint'
      )
      .sort((a, b) => {
        const dateA = new Date(a.uploadedAt).getTime();
        const dateB = new Date(b.uploadedAt).getTime();

        return dateB - dateA; // Sort in descending order (latest first)
      })
      .shift();
    // const lastVideo: any = attachments.find(
    //   (attachment: any) =>
    //     attachment.attachmentType === 'image' &&
    //     (attachment.category !== '3d' || attachment.category !== 'Blueprint')
    // );
    console.log('lastVideo', lastVideo);

    if (lastVideo) {
      setImage(lastVideo);
    } else {
      setImage(null);
    }
  };
  const set3dLastImage = () => {
    const lastVideo = attachments.find(
      (attachment) =>
        (attachment.attachmentType === 'document' ||
          attachment.attachmentType === 'image') &&
        attachment.category === '3d'
    );

    if (lastVideo) {
      setdImage(lastVideo);
    } else {
      setdImage(null);
    }
  };

  const setLastDoc = () => {
    const lastVideo = attachments.find(
      (attachment) =>
        attachment.attachmentType === 'document' &&
        attachment.category === 'Blueprint'
    );
    if (lastVideo) {
      setDoc(lastVideo.filePath);
    } else {
      setDoc(null);
    }
  };

  const startDate: any = dayjs(dashboard?.startDate);
  const endDate = dayjs(dashboard?.endDate);
  const currentDate = dayjs(dashboard?.currentDate || dayjs());

  const totalDays = endDate.diff(startDate, 'day');

  const daysPassed = currentDate.diff(startDate, 'day');

  //   const progressPercentage = (daysPassed / totalDays) * 100;

  //   const finalProgress = Math.min(Math.max(progressPercentage, 0), 100);

  const calculateProgressWidth = (
    startDate: any,
    endDate: any,
    currentDate: any
  ) => {
    const start: any = new Date(startDate);
    const end: any = new Date(endDate);
    const current: any = new Date(currentDate);

    if (current < start) return 0;
    if (current > end) return 100;

    // Calculate total days in the range
    const totalDays = (end - start) / (1000 * 60 * 60 * 24);
    const elapsedDays = (current - start) / (1000 * 60 * 60 * 24);

    // Calculate progress width
    return (elapsedDays / totalDays) * 100;
  };

  useEffect(() => {
    setLastVideo();
    set3dLastImage();
    setLastImage();
    setLastDoc();
  }, [attachments]);

  console.log('daysPassed', image, video);

  return (
    <>
      {daysPassed >= 1 && (
        <div className="mb-5 px-1">
          <div className="relative h-[40px] w-[99%] mx-auto rounded-xl bg-gray-200">
            <div
              className="absolute left-0 top-0 h-full rounded-xl bg-green-500"
              style={{
                width: `${calculateProgressWidth(dashboard?.startDate, dashboard?.endDate, dashboard?.currentDate)}%`,
              }}
            />

            <span
              className="absolute top-2 translate-y-full text-sm font-medium text-black"
              style={{
                left: `${calculateProgressWidth(dashboard?.startDate, dashboard?.endDate, dashboard?.currentDate)}%`,
                transform: 'translateX(-15%)',
              }}
            >
              Day {daysPassed}
            </span>
          </div>

          <div className="mt-1 flex justify-between text-sm text-gray-500 px-3">
            <span>{startDate.format('YYYY-MM-DD')} ( Day 01 )</span>
            <span>{totalDays} Days </span>
          </div>
        </div>
      )}
      <div className="mb-2 px-4 xl:w-[50%]">
        <span className="mb-3 block text-[16px] font-medium capitalize leading-normal text-secondary max-[1024px]:mt-7">
          select project
        </span>
        {/* max-[1024px]:max-w-[80%] max-[768px]:max-w-full */}
        <Select
          value={selectedProjects?.id}
          onValueChange={(value) =>
            dispatch(setSelectedProject(projects.find((x) => x.id === value)))
          }
        >
          <SelectTrigger className="ne-tabs h-[60px] w-full rounded-[36px] border-0 border-none border-transparent bg-white shadow-none focus:border-transparent focus:ring-0">
            <SelectValue className="px-3" placeholder="Select Projects">
              {projects.find((project) => project.id === selectedProjects?.id)
                ?.name || 'Select Projects'}
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
      <div className="flex gap-3 rounded-[40px] my-6 max-[1024px]:flex-col">
        {/* <div className="flex basis-[50%] items-center max-[1024px]:basis-[100%]">
          <div className="max-w-[656px] max-[1024px]:mx-auto max-[1024px]:max-w-[90%] max-[768px]:max-w-full">
            <div className="mb-2 flex items-center justify-between px-4">
              <span className="mb-2 block text-[16px] font-medium capitalize leading-normal text-secondary">
                Most recent progress videos and images
              </span>
              <NavLink
                to="gallery"
                className="block text-[14px] font-medium capitalize leading-normal text-secondary underline"
              >
                see all
              </NavLink>
            </div>
            {image?.uploadedAt > video?.uploadedAt && image?.filePath ? (
              <img
                src={image?.filePath}
                alt="3D-3dImage"
                className="h-[200px] object-cover"
              />
            ) : (
              image?.uploadedAt > video?.uploadedAt && (
                <img
                  src={assets.images.noFile}
                  alt="img"
                  className="h-[350px] w-[700px] rounded-3xl object-cover"
                />
              )
            )}

            {video?.uploadedAt > image?.uploadedAt && video?.filePath ? (
              <video
                className="h-full max-h-[350px] w-full rounded-[20px]"
                controls
              >
                <source src={video?.filePath} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              video?.uploadedAt > image?.uploadedAt && (
                <img
                  src={assets.images.noVideo}
                  alt="video"
                  className="h-[350px] w-[700px] rounded-3xl object-cover"
                />
              )
            )}
          </div>
        </div> */}
        <div className="basis-[50%] px-4 max-[1260px]:my-2">
          <div className="h-[400px] rounded-[40px] border-2 p-5 max-[1024px]:h-auto">
            <NavLink to="/gallery">
              <div className="mb-[15px] flex items-center justify-start gap-2">
                <img
                  src={assets.images.playIcon}
                  alt="icons"
                  className="h-[25px] w-[25px]"
                />

                <span className="text-[14px] font-bold leading-normal text-secondary">
                  Most recent progress videos and images
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="9"
                  viewBox="0 0 10 9"
                  fill="none"
                >
                  <path d="M1 8.5L9 0.5M9 0.5H1M9 0.5V8.5" stroke="#14242E" />
                </svg>
              </div>
            </NavLink>
            <div className="mx-auto h-[250px] max-[1024px]:h-[300px] max-[768px]:h-[220px] max-[576px]:h-full">
              {image?.uploadedAt > video?.uploadedAt && image?.filePath ? (
                <div className="flex h-full items-center justify-center">
                  <img
                    src={image?.filePath}
                    alt="3D-3dImage"
                    className="h-[150px] object-contain"
                  />
                </div>
              ) : (
                image?.uploadedAt > video?.uploadedAt && (
                  <img
                    src={assets.images.noFile}
                    alt="img"
                    className="h-[350px] w-[700px] rounded-3xl object-cover"
                  />
                )
              )}

              {video?.uploadedAt > image?.uploadedAt && video?.filePath ? (
                <video
                  className="h-full max-h-[350px] w-full rounded-[20px]"
                  controls
                >
                  <source src={video?.filePath} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                video?.uploadedAt > image?.uploadedAt && (
                  <img
                    src={assets.images.noVideo}
                    alt="video"
                    className="h-[350px] w-[700px] rounded-3xl object-cover"
                  />
                )
              )}
            </div>
          </div>
        </div>
        <div className="basis-1/2 px-1 max-[1024px]:basis-full max-[1024px]:px-3 max-[768px]:px-0">
          <div className="flex flex-wrap items-center justify-around gap-4 max-[1024px]:justify-start max-[768px]:gap-6 max-[576px]:flex-col">
            <div className="w-full px-2 ">
              <div className="flex flex-col gap-4">
                <div className="bg-ban-three min-h-[400px] w-full rounded-[25px] p-6 max-[768px]:min-h-[350px] max-[768px]:w-full max-[576px]:min-h-[300px]">
                  <div className="flex items-center justify-between max-[768px]:flex-col max-[768px]:items-start">
                    <div className="text-[24px] font-medium leading-normal text-white">
                      Project Plan
                    </div>
                    <NavLink
                      to="/plans"
                      className="mt-[10px] block text-[16px] font-medium capitalize leading-normal text-secondary underline max-[768px]:mt-4"
                    >
                      View Details
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex min-h-[400px] max-[1260px]:flex-col">
        <div className="basis-[50%] max-[1260px]:my-3 max-[1260px]:max-w-[600px] max-[1024px]:max-w-full">
          <div className="bg-ban-two p-5 max-[1024px]:min-h-[500px] max-[1024px]:p-7 max-[576px]:p-[20px]">
            <div className="flex max-w-full items-center justify-between py-2 text-[22px] gap-2 font-medium leading-normal text-secondary  max-[768px]:text-[20px]">
              <span className=''>Project Quotations and Payments</span>
              <span
                onClick={() => navigate('./project-quotations')}
                className="cursor-pointer text-sm underline underline-offset-2"
              >
                View all quotations
              </span>
            </div>
            <div className="mb-2 text-[40px] font-bold leading-normal text-[#EB5A00] max-[480px]:text-[24px]">
              {
                formatCurrency(dashboard?.totalQuotation ?? 0, CURRENCY).split(
                  '.'
                )[0]
              }
              <span className="break-all leading-4 text-secondary opacity-[0.5]">
                {
                  formatCurrency(
                    dashboard?.totalQuotation ?? 0,
                    CURRENCY
                  ).split('.')[1]
                }
              </span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g opacity="0.5" clipPath="url(#clip0_44_143)">
                  <path
                    d="M10 7.33331V3.33331L8 1.33331L6 3.33331V4.66665H2V14H14V7.33331H10ZM4.66667 12.6666H3.33333V11.3333H4.66667V12.6666ZM4.66667 9.99998H3.33333V8.66665H4.66667V9.99998ZM4.66667 7.33331H3.33333V5.99998H4.66667V7.33331ZM8.66667 12.6666H7.33333V11.3333H8.66667V12.6666ZM8.66667 9.99998H7.33333V8.66665H8.66667V9.99998ZM8.66667 7.33331H7.33333V5.99998H8.66667V7.33331ZM8.66667 4.66665H7.33333V3.33331H8.66667V4.66665ZM12.6667 12.6666H11.3333V11.3333H12.6667V12.6666ZM12.6667 9.99998H11.3333V8.66665H12.6667V9.99998Z"
                    fill="#14242E"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_44_143">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="text-[14px] font-medium leading-normal text-secondary capitalize">
                {user?.firstName ? user?.firstName : ''}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-1">
              <span className="break-all text-[14px] font-medium capitalize leading-normal text-secondary">
                Total paid
              </span>
            </div>
            <div className="mb-2 max-w-[200px] text-[24px] font-bold leading-normal text-[#EB5A00]">
              {
                formatCurrency(dashboard?.totalPaid ?? 0, CURRENCY).split(
                  '.'
                )[0]
              }
              <span className="text-secondary opacity-[0.5]">
                {
                  formatCurrency(dashboard?.totalPaid ?? 0, CURRENCY).split(
                    '.'
                  )[1]
                }
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2 max-[576px]:flex-col max-[576px]:items-start">
              <span className="text-[14px] font-medium capitalize leading-normal text-secondary ">
                Due amount
              </span>
              {/* <span className="text-[14px] font-medium capitalize leading-normal text-secondary ">
                27th June 2024
              </span> */}
            </div>
            <div className="mb-4 max-w-[200px] text-[24px] font-bold leading-normal text-[#EB5A00]">
              {formatCurrency(dashboard?.totalDue ?? 0, CURRENCY).split('.')[0]}
              <span className="break-all text-secondary opacity-[0.5]">
                {
                  formatCurrency(dashboard?.totalDue ?? 0, CURRENCY).split(
                    '.'
                  )[1]
                }
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2 max-[576px]:flex-col max-[576px]:items-start">
              <span className="text-[14px] font-medium capitalize leading-normal text-secondary max-[480px]:max-w-[120px]">
                Labor & Material amount
              </span>
              {/* <span className="text-[14px] font-medium capitalize leading-normal text-secondary ">
                27th June 2024
              </span> */}
            </div>
            <div className="mb-4 max-w-[200px] text-[24px] font-bold leading-normal text-[#EB5A00]">
              {
                formatCurrency(dashboard?.totalLabor ?? 0, CURRENCY).split(
                  '.'
                )[0]
              }
              <span className="break-all text-secondary opacity-[0.5]">
                {
                  formatCurrency(dashboard?.totalLabor ?? 0, CURRENCY).split(
                    '.'
                  )[1]
                }
              </span>
            </div>
          </div>
        </div>
        <div className="basis-[50%] px-4 max-[1260px]:my-2">
          <div className="h-[400px] rounded-[40px] border-2 bg-[#BBCDD2] p-5">
            <NavLink to="/gallery">
              <div className="mb-[15px] flex items-center justify-start gap-2">
                <img
                  src={assets.images.playIcon}
                  alt="icons"
                  className="h-[25px] w-[25px]"
                />

                <span className="text-[14px] font-bold leading-normal text-secondary">
                  3D renders
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="9"
                  viewBox="0 0 10 9"
                  fill="none"
                >
                  <path d="M1 8.5L9 0.5M9 0.5H1M9 0.5V8.5" stroke="#14242E" />
                </svg>
              </div>
            </NavLink>
            <div className="mx-auto h-[250px] max-[1024px]:h-[300px] max-[768px]:h-[220px] max-[576px]:h-full">
              {dImage?.filePath ? (
                <>
                  <div className="flex justify-center p-1">
                    <a href={dImage.filePath} rel="noopener noreferrer">
                      <FileText size={250} className="opacity-[.7]" />
                    </a>
                  </div>
                  <div className="text-center font-semibold capitalize">
                    <h5 className="text-[16px]">{dImage.title}</h5>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={assets.images.noFile}
                    alt="3D-3dImage"
                    className="h-full w-full object-contain p-5 max-[1260px]:object-cover"
                  />
                  <div className="text-center">
                    <h5 className="text-[16px] opacity-[0.5]">
                      No Renders Found
                    </h5>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
