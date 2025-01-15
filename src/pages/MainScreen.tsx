import assets from '@/assets';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchProjectAttachments } from '@/redux/features/projectAttachmentsSlice';
import {
  fetchProjects,
  setSelectedProject,
} from '@/redux/features/projectSlice';
import { fetchProjectDashboard } from '@/redux/features/projectDashboardSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { CURRENCY } from '@/utils/constant';
import { formatCurrency } from '@/utils/helpers';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const MainScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.authState);
  const [video, setVideo] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [doc, setDoc] = useState<string | null>(null);
  const { projects, selectedProjects } = useAppSelector((s) => s.projectState);
  const { attachments } = useAppSelector((s) => s.projectAttachmentsState);
  const { dashboard } = useAppSelector((s) => s.projectdashboardState);

  const fetchProjectsData = () => {
    dispatch(fetchProjects({}));
  };

  const fetchProjectActivityData = () => {
    dispatch(fetchProjectDashboard({ projectId: selectedProjects?.id }));
  };

  useEffect(() => {
    fetchProjectsData();
    fetchProjectActivityData();
  }, [dispatch]);

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
    const lastVideo = attachments.find(
      (attachment) =>
        attachment.attachmentType === 'image' && attachment.category === '3d'
    );
    if (lastVideo) {
      setImage(lastVideo.filePath);
    } else {
      setImage(null);
    }
  };
  const setLastDoc = () => {
    const lastVideo = attachments.find(
      (attachment) =>
        attachment.attachmentType === 'image' && attachment.category !== '3d'
    );
    if (lastVideo) {
      setDoc(lastVideo.filePath);
    } else {
      setDoc(null);
    }
  };

  const getColor = (value: any) => {
    if (value >= 0 && value <= 50) return '#FF0000'; // Red
    if (value >= 51 && value <= 99) return '#FFD700'; // Yellow
    if (value === 100) return '#008000'; // Green
    return '#1a90ff'; // Default color
  };

  useEffect(() => {
    setLastVideo();
    setLastImage();
    setLastDoc();
  }, [attachments]);

  return (
    <>
      <div className="mb-5">
        <div className="relative h-[40px] w-[99%] rounded-xl bg-gray-200">
          <div
            className="absolute left-0 top-0 h-full rounded-xl"
            style={{
              width: `${dashboard?.progressPercentage}%`,
              backgroundColor: getColor(dashboard?.progressPercentage),
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center font-semibold text-black">
            {`${dashboard?.progressPercentage ? dashboard?.progressPercentage : '0'}%`}
          </span>
        </div>
      </div>
      <div className="flex gap-3  rounded-[40px] max-[1024px]:flex-col">
        <div className="basis-[50%] max-[1024px]:basis-[100%]">
          <div className="max-w-[656px] max-[1024px]:mx-auto max-[1024px]:max-w-[90%] max-[768px]:max-w-full">
            <div className="mb-2 flex items-center justify-between px-4">
              <span className="mb-2 block text-[16px] font-medium capitalize leading-normal text-secondary">
                Most recent video
              </span>
              <NavLink
                to="gallery"
                className="block text-[14px] font-medium capitalize leading-normal text-secondary underline"
              >
                see all
              </NavLink>
            </div>
            {video ? (
              <video
                className="h-full max-h-[350px] w-full rounded-[20px]"
                controls
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={assets.images.noVideo}
                alt="video"
                className="h-[350px] w-full object-cover"
              />
            )}
          </div>
        </div>
        <div className="basis-[50%] max-[1024px]:basis-[100%] max-[1024px]:px-5 max-[768px]:px-1">
          <div className="mb-2 px-4 max-[1024px]:max-w-[80%] max-[768px]:max-w-full">
            <span className="mb-3 block text-[16px] font-medium capitalize leading-normal text-secondary max-[1024px]:mt-7">
              select project
            </span>
            <Select
              value={selectedProjects?.id}
              onValueChange={(value) =>
                dispatch(
                  setSelectedProject(projects.find((x) => x.id === value))
                )
              }
            >
              <SelectTrigger className="ne-tabs h-[60px] w-full rounded-[36px] border-0 border-none border-transparent bg-white shadow-none focus:border-transparent focus:ring-0">
                <SelectValue className="px-3" placeholder="Select Projects">
                  {projects.find(
                    (project) => project.id === selectedProjects?.id
                  )?.name || 'Select Projects'}
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
          <div className="flex items-center justify-around gap-[15px] px-[5px] max-[1024px]:justify-start max-[1024px]:gap-[30px] max-[576px]:flex-col">
            <div className="my-[10px] max-[576px]:w-full">
              <NavLink to="/gallery">
                <div className="mb-[15px] flex items-center justify-center gap-2">
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
              <div className=" mx-auto h-[250px] text-center max-[1024px]:h-[300px] max-[768px]:h-[220px] max-[576px]:h-full">
                {image ? (
                  <img
                    src={image}
                    alt="3D-image"
                    className="ne-box-shade h-full w-full object-contain max-[1260px]:object-cover"
                  />
                ) : (
                  <img
                    src={assets.images.noFile}
                    alt="3D-image"
                    className="ne-box-shade h-full w-full object-contain max-[1260px]:object-cover"
                  />
                )}
              </div>
            </div>
            <div className="my-[10px] max-[576px]:w-full">
              <NavLink to="/gallery/blueprints">
                <div className="mb-[15px] flex items-center justify-center gap-2">
                  <img
                    src={assets.images.playIcon}
                    alt="icons"
                    className="h-[25px] w-[25px]"
                  />
                  <span className="text-[14px] font-bold capitalize leading-normal text-secondary">
                    project blueprints
                  </span>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="9"
                      viewBox="0 0 10 9"
                      fill="none"
                    >
                      <path
                        d="M1 8.5L9 0.5M9 0.5H1M9 0.5V8.5"
                        stroke="#14242E"
                      />
                    </svg>
                  </a>
                </div>
              </NavLink>
              <div className="mx-auto h-[250px] text-center max-[1024px]:h-[300px] max-[768px]:h-[220px] max-[576px]:h-full">
                {doc ? (
                  <img
                    src={doc}
                    alt="3D-image"
                    className="ne-box-shade h-full w-full object-contain max-[1260px]:object-cover"
                  />
                ) : (
                  <img
                    src={assets.images.blueprintNoFile}
                    alt="3D-image"
                    className="ne-box-shade h-full w-full object-contain max-[1260px]:object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex min-h-[420px] max-[1260px]:flex-col ">
        <div className="basis-[40%] max-[1260px]:my-3 max-[1260px]:max-w-[600px]">
          <div className="bg-ban-two p-5">
            <div className="flex max-w-full items-center justify-between py-2 text-[24px] font-medium leading-normal text-secondary">
              <span>Total investment plan</span>
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
              <span className="text-[14px] font-medium leading-normal text-secondary">
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
              <span className="text-[14px] font-medium capitalize leading-normal text-secondary ">
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
        <div className="basis-[60%] px-4 py-2 max-[1260px]:my-2">
          <div className="flex items-center justify-between gap-4 max-[768px]:flex-col max-[767px]:items-start">
            <div className="bg-ban-three min-h-[400px] flex-1 p-6 max-[768px]:min-h-[350px] max-[768px]:w-[80%] max-[576px]:w-full">
              <div className="flex items-center justify-between max-[768px]:flex-col max-[768px]:items-start">
                <div className=" text-[24px] font-medium leading-normal text-white">
                  Project Plan
                </div>
                <NavLink
                  to="/plans"
                  className="block text-[16px] font-medium capitalize leading-normal text-secondary underline"
                >
                  view details
                </NavLink>
              </div>
            </div>
            <div className="min-h-[400px] flex-1 rounded-[50px] bg-white p-6 max-[768px]:min-h-[350px] max-[768px]:w-[80%] max-[576px]:w-full max-[576px]:p-3">
              <div className="flex items-center justify-between max-[768px]:flex-col max-[768px]:items-start">
                <div className=" mb-2 text-[24px] font-medium leading-normal text-secondary">
                  Milestones
                </div>
                <a
                  href="#"
                  className="block text-[16px] font-medium capitalize leading-normal text-secondary underline"
                >
                  view details
                </a>
              </div>
              <div className="my-3 h-[59px] w-[269px] rounded-[50px] border-2 border-primary max-[480px]:w-full">
                <div className="block h-full w-[70%] rounded-[50px] bg-primary">
                  <span className="block w-[120px]   px-5  py-2 text-[16px] font-bold leading-normal text-white">
                    Demolition
                  </span>
                </div>
              </div>
              <div className="my-3 h-[59px] w-[269px] rounded-[50px] border-2 border-primary max-[480px]:w-full">
                <div className="block h-full w-[90%] rounded-[50px] bg-primary">
                  <span className="block w-[120px]   px-5  py-2 text-[16px] font-bold leading-normal text-white">
                    Construction
                  </span>
                </div>
              </div>
              <div className="my-3 h-[59px] w-[269px] rounded-[50px] border-2 border-primary max-[480px]:w-full">
                <div className="block h-full w-[50%] rounded-[50px] bg-primary">
                  <span className="block w-[120px]   px-5  py-2 text-[16px] font-bold leading-normal text-white">
                    Finishing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
