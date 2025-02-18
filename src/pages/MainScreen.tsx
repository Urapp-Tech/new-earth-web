import assets from '@/assets';
import { fetchProjectAttachments } from '@/redux/features/projectAttachmentsSlice';
import { fetchProjectDashboard } from '@/redux/features/projectDashboardSlice';
import {
  fetchProjects,
  setSelectedProject,
} from '@/redux/features/projectSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { CURRENCY } from '@/utils/constant';
import { formatCurrency, sortArrayByKey } from '@/utils/helpers';
import { useEffect, useState } from 'react';
// import { Progress } from '@/components/ui/progress';
import dayjs from 'dayjs';
import { Check, EyeIcon } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CarouselItems } from '@/components/Carousel';
import PlanDetailsDialog from './plans/PlanDetailsDialog';
import { Button } from '@/components/ui/button';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const MainScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [mediaItems, setMediaItems] = useState<any>(null);
  const [threeditems, setThreedItems] = useState<any>(null);

  const { projects, selectedProjects } = useAppSelector((s) => s.projectState);
  const { attachments } = useAppSelector((s) => s.projectAttachmentsState);
  const { dashboard } = useAppSelector((s) => s.projectdashboardState);

  const [showPlanDetails, setShowPlanDetails] = useState<boolean>(false);
  const [projectPlan, setProjectPlan] = useState<any>();

  useEffect(() => {
    dispatch(fetchProjects({}));
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0 && selectedProjects === null) {
      dispatch(setSelectedProject(projects[0]));
    }
  }, [projects]);

  useEffect(() => {
    if (selectedProjects?.id) {
      dispatch(fetchProjectAttachments({ project_id: selectedProjects?.id }));
      dispatch(fetchProjectDashboard({ projectId: selectedProjects?.id }));
    }
  }, [selectedProjects]);

  const setImagesVideos = () => {
    const resp: any = attachments?.filter(
      (attachment: any) =>
        (attachment.attachmentType === 'image' ||
          attachment.attachmentType === 'video') &&
        attachment.category !== '3d' &&
        attachment.category !== 'Blueprint'
    );

    if (resp?.length) {
      setMediaItems(resp);
    } else {
      setMediaItems(null);
    }
  };

  const set3dsDocs = () => {
    const resp = attachments.filter(
      (attachment: any) =>
        (attachment.attachmentType === 'document' ||
          attachment.attachmentType === 'image') &&
        attachment.category === '3d'
    );

    if (resp?.length) {
      setThreedItems(resp);
    } else {
      setThreedItems(null);
    }
  };

  const startDate: any = dayjs(dashboard?.startDate);
  const endDate = dayjs(dashboard?.endDate);
  const currentDate = dayjs();

  useEffect(() => {
    setImagesVideos();
    set3dsDocs();
  }, [attachments]);

  const handleProjectPlanSelection = (plan: any) => {
    setProjectPlan(plan);
    setShowPlanDetails(true);
  };

  const customProgressBar = () => {
    const dd = Number(selectedProjects?.demolitionDays || 0);
    const cd = Number(selectedProjects?.constructionDays || 0);
    const fd = Number(selectedProjects?.finishingDays || 0);

    // const totalDays = dd + cd + fd;

    // Demolition Date Calculation
    const demolitionStartDate = startDate;
    const demolitionEndDate = demolitionStartDate.add(dd, 'days');
    const demolitionElapsedDays = Math.max(
      currentDate.diff(demolitionStartDate, 'day') + 1,
      0
    );
    const demolitionProgressPercent: any = Math.min(
      (demolitionElapsedDays / dd) * 100,
      100
    );

    // Construction Date Calculation (after demolition)
    const constructionStartDate = demolitionEndDate; // Construction starts right after demolition ends
    const constructionElapsedDays =
      currentDate.diff(constructionStartDate, 'day') + 1; // Including today
    const constructionProgressPercent =
      demolitionProgressPercent === 100
        ? Math.min((constructionElapsedDays / cd) * 100, 100)
        : // 100
          0;

    const finishingStartDate = demolitionEndDate.add(cd, 'days');
    const finishingElapsedDays =
      currentDate.diff(finishingStartDate, 'day') + 1;
    const finishingProgressPercent =
      constructionProgressPercent === 100
        ? Math.min((finishingElapsedDays / fd) * 100, 100)
        : // 100
          0;

    return (
      <div className="">
        <div className="grid h-[10px] grid-cols-12 rounded-2xl bg-[#C9C9C9]">
          <div className="relative col-span-4 w-full">
            <span
              style={{
                width: `${demolitionProgressPercent}%`,
              }}
              className={`absolute left-0 h-[10px] rounded-2xl bg-primary`}
            ></span>
            <span
              style={{
                backgroundColor:
                  demolitionProgressPercent === 100 ? `#f27426` : '#C9C9C9',
              }}
              className="absolute right-[-5px] top-[-10px] z-10 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#C9C9C9]"
            >
              {demolitionProgressPercent === 100 ? (
                <Check size="20px" color="white" />
              ) : (
                1
              )}
            </span>
            <span className="absolute right-[-20px] top-[25px] z-10 flex items-center justify-center">
              Demolition
            </span>
          </div>
          <div className="relative col-span-4 w-full">
            <span
              style={{
                width: `${constructionProgressPercent}%`,
              }}
              className={`absolute left-0  h-[10px] rounded-2xl bg-primary`}
            ></span>
            <span
              style={{
                backgroundColor:
                  constructionProgressPercent === 100 ? `#f27426` : '#C9C9C9',
              }}
              className="absolute  right-[-5px] top-[-10px] z-10 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#C9C9C9]"
            >
              {constructionProgressPercent === 100 ? (
                <Check size="20px" color="white" />
              ) : (
                2
              )}
            </span>
            <span className="absolute right-[-20px] top-[25px] z-10 flex items-center justify-center">
              Construction
            </span>
          </div>
          <div className="relative col-span-4 w-full">
            <span
              style={{
                width: `${finishingProgressPercent}%`,
              }}
              className={`absolute left-0 h-[10px] rounded-2xl bg-primary`}
            ></span>
            <span
              style={{
                backgroundColor:
                  finishingProgressPercent === 100 ? `#f27426` : '#C9C9C9',
              }}
              className="absolute  right-[-5px] top-[-10px] z-10 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#C9C9C9]"
            >
              {finishingProgressPercent === 100 ? (
                <Check size="20px" color="white" />
              ) : (
                3
              )}
            </span>
            <span className="absolute right-[-5px] top-[25px] z-10 flex items-center justify-center">
              Finishing
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* {selectedProjects?.id && daysPassed >= 1 && ( */}
      <div className=" mb-14 px-1 max-[768px]:my-5">
        {selectedProjects?.demolitionDays && (
          <>
            <div className="mx-1 mb-3 flex items-center justify-between">
              <div>
                <span className="pr-4 text-[20px] text-secondary">
                  Project Status
                </span>
                <span className="text-[14px] text-secondary">
                  {dayjs(dashboard?.startDate).format('D MMM, YYYY')}
                </span>
              </div>
              <div className="text-[14px] text-secondary">
                <span className="text-[14px] font-[500] text-secondary">
                  {currentDate >= endDate
                    ? 'Completed'
                    : `${dayjs().to(dashboard?.endDate, true)} remaining`}
                </span>
              </div>
            </div>
            <div>{customProgressBar()}</div>
          </>
        )}

        {/* <div className="mt-1 flex justify-between px-3 py-2 text-sm text-gray-500">
          <span>{startDate.format('YYYY-MM-DD')} ( Day 01 )</span>
          <span>{totalDays} Days </span>
        </div> */}
      </div>
      {/* )} */}
      <div className="grid grid-cols-12 gap-5 rounded-[40px] max-[1024px]:flex-col">
        <div className="col-span-6 max-[1260px]:my-2">
          <div className="rounded-[40px] border-2 p-5 max-[1024px]:h-auto">
            <NavLink to="/gallery">
              <div className="flex items-center justify-start gap-2">
                <img
                  src={assets.images.playIcon}
                  alt="icons"
                  className="h-[25px] w-[25px]"
                />

                <span className="text-[24px] font-bold leading-normal text-secondary">
                  Site Updates
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
              <span className="mx-8 text-[14px] text-[#14242E]">
                (images and videos)
              </span>
            </NavLink>
            <div className="my-8">
              {mediaItems?.length ? (
                <CarouselItems
                  type="day"
                  items={mediaItems}
                  cardHeight="h-[194px]"
                />
              ) : (
                <div className="flex h-[225px] items-center justify-center text-[#14242E]">
                  Images and Videos not uploaded yet.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-6 max-[1260px]:my-2">
          <div className="h-[393px] rounded-[40px] border-2 p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[24px] font-bold leading-normal text-secondary">
                Project Plans
              </span>
              <NavLink to="/plans">
                <span className="text-[14px] leading-normal text-secondary underline underline-offset-2">
                  View Details
                </span>
              </NavLink>
            </div>
            <span className="text-[14px] text-[#14242E]">
              (daily tasks and updates)
            </span>
            <div className="mt-5 w-full">
              <div className="rounded-[20px]">
                {dashboard?.projectPlanResult?.length ? (
                  <table className="w-full border-0">
                    <tbody className="w-full border-0">
                      {sortArrayByKey(
                        dashboard?.projectPlanResult,
                        'day',
                        'asc'
                      ).map((plan: any, index: number) => {
                        // let count = 0;
                        // if (plan.data && plan.data.length > 0) {
                        //   count = plan.data.reduce(
                        //     // eslint-disable-next-line @typescript-eslint/no-shadow
                        //     (total: number, item: any) =>
                        //       total + (item?.count ?? 0),
                        //     0
                        //   );
                        // }
                        return (
                          <div>
                            <tr
                              key={index}
                              className="border-grey-100 w-full border-[0px] text-left"
                            >
                              <td className="w-[65%] py-1 text-[18px]">
                                {plan.day}
                              </td>
                              <td className="w-[35%] py-1">
                                Plan Activities: {plan?.data?.length || 0}
                              </td>
                              <td className="py-1">
                                <Button
                                  onClick={() =>
                                    handleProjectPlanSelection(plan)
                                  }
                                  className="btn-flips  my-[10px] h-[46px] w-[46px] rounded-[28px] bg-[#C9C9C9] text-primary hover:bg-primary hover:text-white"
                                >
                                  <EyeIcon />
                                </Button>
                              </td>
                            </tr>
                            <hr className="h-2" />
                          </div>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex h-[200px] items-center justify-center text-[#14242E]">
                    Plans not uploaded yet.
                  </div>
                )}
                <PlanDetailsDialog
                  open={showPlanDetails}
                  setOpen={(val) => setShowPlanDetails(val)}
                  plan={projectPlan}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid h-[550px] min-h-[400px] grid-cols-12 max-[1260px]:flex-col">
        <div className="col-span-6 px-2 max-[1260px]:my-2">
          <div className="bg-ban-two max-[480px]:background-[#fff] p-5 max-[1024px]:min-h-[500px] max-[1024px]:p-7 max-[576px]:p-[20px]">
            <div className="flex max-w-full items-center justify-between gap-2 pt-2 text-[22px] font-medium leading-normal text-secondary  max-[768px]:text-[20px] max-[480px]:flex-col max-[480px]:items-start">
              <span className="">Project Payments</span>
              <span
                onClick={() => navigate('./project-quotations')}
                className="cursor-pointer text-sm underline underline-offset-2"
              >
                View all quotations
              </span>
            </div>
            <div className="pb-2">
              <span className="text-[14px] text-[#14242E]">
                (received, bills, dues)
              </span>
            </div>
            <div className="mb-2 text-[40px] font-bold leading-normal text-[#EB5A00] max-[480px]:text-[24px]">
              {
                formatCurrency(dashboard?.totalQuotation ?? 0, CURRENCY).split(
                  '.'
                )[0]
              }
              <span className="break-all text-[24px] leading-4 text-secondary opacity-[0.5]">
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
              <span className="text-[14px] font-medium capitalize leading-normal text-secondary">
                {selectedProjects?.name ? selectedProjects?.name : ''}
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
          </div>
        </div>
        <div className="col-span-6 px-2 max-[1260px]:my-2">
          <div className="h-[400px] rounded-[40px] border-2 p-5">
            <NavLink to="/gallery" state={{ tab: '3drendersandblueprints' }}>
              <div className="flex items-center justify-start gap-2">
                <img
                  src={assets.images.playIcon}
                  alt="icons"
                  className="h-[25px] w-[25px]"
                />

                <span className="text-[24px] font-bold leading-normal text-secondary">
                  Project Documents
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
              <span className="mx-8 text-[14px] text-[#14242E]">
                (2d layouts, 3d render and others)
              </span>
            </NavLink>
            <div className="my-8 w-full">
              {threeditems?.length ? (
                <CarouselItems
                  type="title"
                  items={threeditems}
                  cardHeight="h-[243px]"
                />
              ) : (
                <div className="flex h-[250px] items-center justify-center text-[#14242E]">
                  3d Images and Docs not uploaded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
