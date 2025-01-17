// import React from 'react';
// import assets from '@/assets';
// import ViewApp from '@/components/common/Viewer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { fetchProjectAttachments } from '@/redux/features/projectAttachmentsSlice';
import { fetchProjectQuotations } from '@/redux/features/projectQuotationSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { RootState } from '@/redux/store';
import { formatCurrency } from '@/utils/helpers';
import dayjs from 'dayjs';
import { FileText } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProjectQuotation() {
  const dispatch = useAppDispatch();
  // const [currentImage, setCurrentImage] = useState(0);
  // const [isViewerOpen, setIsViewerOpen] = useState(false);
  // const [allImages, setAllImages] = useState<any[]>([]);

  const { projectQuotations } = useAppSelector(
    (s: RootState) => s.projectQuotationState
  );
  const { selectedProjects } = useAppSelector((s: RootState) => s.projectState);

  const fetchQuotationsData = () => {
    if (selectedProjects?.id) {
      dispatch(
        fetchProjectQuotations({
          projectId: selectedProjects?.id,
        })
      );
    }
  };

  useEffect(() => {
    fetchQuotationsData();
  }, []);

  //   const fetchProjectsData = () => {
  //     dispatch(fetchProjectQuotations({}));
  //   };
  //   type: 'QUOTATION',
  //           projectId: watch('projectId') ? watch('projectId') : '',

  // console.log(
  //   '🚀 ~ ProjectQuotation ~ projectQuotations:',
  //   projects,
  //   selectedProjects,
  //   projectQuotations
  // );
  const { tab = 'Quotation' } = useParams();

  //   useEffect(() => {
  //     if (projects.length > 0 && !selectedProjects) {
  //       dispatch(setSelectedProject(projects[0]));
  //     }
  //   }, [projects]);

  //   useEffect(() => {
  //     if (selectedProjects) {
  //       dispatch(fetchProjectAttachments({ project_id: selectedProjects.id }));
  //     }
  //   }, [selectedProjects]);
  return (
    <div>
      <div className="p-2 max-[1024px]:px-[40px] max-[768px]:p-0">
        <div className="mb-5 text-[28px] text-secondary max-[576px]:text-center max-[768px]:text-[18px] max-[576px]:text-{16px}">
          Project Quotations and Payments
        </div>
        <div className="rounded-[20px]  bg-white">
          <Tabs defaultValue={tab} className="w-full ">
            <div className="tabs--head max-[768px]:overflow-y-hidden max-[768px]:overflow-x-scroll">
              <TabsList className="w-full justify-start p-0 max-[768px]:w-[780px]">
                <TabsTrigger
                  value="Quotation"
                  className="ne-tabs h-auto min-w-[184px] rounded-t-[20px] p-[12px] max-[768px]:min-w-[148px] truncate max-[576px]:text-[16px] "
                >
                  Quotation Cost Slips
                </TabsTrigger>
                <TabsTrigger
                  value="TotalPaid"
                  className="ne-tabs h-auto min-w-[184px] rounded-t-[20px]  p-[12px] shadow-none max-[768px]:min-w-[148px] max-[576px]:text-[16px]"
                >
                  Total Paid Cost Slips
                </TabsTrigger>
                <TabsTrigger
                  value="Labor"
                  className="ne-tabs h-auto min-w-[184px] rounded-t-[20px]  p-[12px] shadow-none max-[768px]:min-w-[148px] max-[576px]:text-[16px]"
                >
                  Labor & Material Cost Slips
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="Quotation" className="m-0">
              <div className="flex flex-wrap justify-start gap-[15px] p-5 ">
                {projectQuotations
                  .filter((a: any) => a.type === 'QUOTATION')
                  .map((x: any, i: number) => {
                    return (
                      <div key={i} className="my-4 basis-[20%]">
                        <div className="mx-auto mb-3 h-[210px] w-[210px] cursor-pointer rounded-[20px] border-[1px] border-[#e3e3e3]">
                          <div className="flex h-full items-center justify-center">
                            <a href={x.filePath} rel="noopener noreferrer">
                              <FileText size={150} />
                            </a>
                          </div>
                        </div>

                        <h5 className="text-center text-[16px] font-extrabold">
                          {formatCurrency(x.quotationCost, 'PKR')}
                        </h5>
                        <h6 className="text-center text-sm opacity-[0.5]">
                          {' '}
                          {dayjs(x.createdAt).format('YYYY-MM-DD')}
                        </h6>
                      </div>
                    );
                  })}
              </div>
            </TabsContent>
            <TabsContent value="TotalPaid" className="m-0">
              <div className="flex flex-wrap justify-start gap-[15px] p-5 ">
                {projectQuotations
                  .filter((a: any) => a.type === 'TOTAL_PAID')
                  .map((x: any, i: number) => {
                    return (
                      <div key={i} className="my-4 basis-[20%]">
                        <div className="mx-auto mb-3 h-[210px] w-[210px] cursor-pointer rounded-[20px] border-[1px] border-[#e3e3e3]">
                          <div className="flex h-full items-center justify-center">
                            <a href={x.filePath} rel="noopener noreferrer">
                              <FileText size={150} />
                            </a>
                          </div>
                        </div>

                        <h5 className="text-center text-[16px] font-extrabold">
                          {formatCurrency(x.totalPaidCost, 'PKR')}
                        </h5>
                        <h6 className="text-center text-sm opacity-[0.5]">
                          {' '}
                          {dayjs(x.createdAt).format('YYYY-MM-DD')}
                        </h6>
                      </div>
                    );
                  })}
              </div>
            </TabsContent>
            <TabsContent value="Labor" className="m-0">
              <div className="mb-3 flex min-h-[400px] flex-wrap justify-start  gap-[15px] p-5">
                {projectQuotations
                  .filter((a: any) => a.type === 'LABOR_PAID')
                  .map((x: any, i: number) => {
                    return (
                      <div key={i} className="my-4 basis-[20%]">
                        <div className="mx-auto mb-3 h-[210px] w-[210px] cursor-pointer rounded-[20px] border-[1px] border-[#e3e3e3]">
                          <div className="flex h-full items-center justify-center">
                            <a href={x.filePath} rel="noopener noreferrer">
                              <FileText size={150} />
                            </a>
                          </div>
                        </div>

                        <h5 className="text-center text-[16px] font-extrabold">
                          {formatCurrency(x.laborCost, 'PKR')}
                        </h5>
                        <h6 className="text-center text-sm opacity-[0.5]">
                          {' '}
                          {dayjs(x.createdAt).format('YYYY-MM-DD')}
                        </h6>
                      </div>
                    );
                  })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
