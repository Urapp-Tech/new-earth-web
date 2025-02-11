// import React from 'react';
// import assets from '@/assets';
// import ViewApp from '@/components/common/Viewer';
import { useEffect, useState } from 'react';
import ImagePreview from '@/components/PreviewImageBox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { fetchProjectAttachments } from '@/redux/features/projectAttachmentsSlice';
import { fetchProjectQuotations } from '@/redux/features/projectQuotationSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { RootState } from '@/redux/store';
import dayjs from 'dayjs';
import { FileText } from 'lucide-react';
import { useParams } from 'react-router-dom';
import CustomCard from '@/components/ImageBox';

export default function ProjectQuotation() {
  const dispatch = useAppDispatch();
  const { tab = 'Quotation' } = useParams();
  const [isPreview, setIsPreview] = useState<{
    state: boolean;
    source: string;
  }>({ state: false, source: '' });

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

  const isImage = (filePath: string): boolean => {
    const imageExtensions = ['jpg', 'jpeg', 'png'];
    const extension = filePath.split('.').pop()?.toLowerCase();
    return extension ? imageExtensions.includes(extension) : false;
  };

  return (
    <div>
      {isPreview?.state && (
        <ImagePreview
          open={isPreview.state}
          setOpen={setIsPreview}
          src={isPreview.source}
        />
      )}
      <div className="h-screen p-2 max-[1024px]:px-[40px] max-[768px]:p-0">
        <div className="max-[576px]:text-{16px} mb-5 text-[28px] text-secondary max-[768px]:text-[18px] max-[576px]:text-center">
          Project Quotations and Payments
        </div>
        <div className="rounded-[20px]  bg-white">
          <Tabs defaultValue={tab} className="w-full ">
            <div className="tabs--head max-[768px]:overflow-y-hidden max-[768px]:overflow-x-scroll">
              <TabsList className="w-full justify-start p-0 max-[768px]:w-[780px] max-[576px]:w-[600px] max-[400px]:w-[500px]">
                <TabsTrigger
                  value="Quotation"
                  className="ne-tabs h-auto min-w-[184px] truncate rounded-t-[20px] p-[12px] max-[768px]:min-w-[148px] max-[576px]:text-[16px] max-[480px]:text-[13px]"
                >
                  Quotation Cost
                </TabsTrigger>
                <TabsTrigger
                  value="TotalPaid"
                  className="ne-tabs h-auto min-w-[184px] rounded-t-[20px]  p-[12px] shadow-none max-[768px]:min-w-[148px] max-[576px]:text-[16px] max-[480px]:text-[13px]"
                >
                  Total Paid Cost
                </TabsTrigger>
                <TabsTrigger
                  value="Labor"
                  className="ne-tabs h-auto min-w-[184px] rounded-t-[20px]  p-[12px] shadow-none max-[768px]:min-w-[148px] max-[576px]:text-[16px] max-[480px]:text-[13px]"
                >
                  Labor & Material Cost
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="Quotation" className="m-0">
              <div className="flex flex-wrap justify-start gap-[15px] p-5 ">
                {projectQuotations?.filter((a: any) => a.type === 'QUOTATION')
                  ?.length ? (
                  projectQuotations
                    .filter((a: any) => a.type === 'QUOTATION')
                    .map((x: any, i: number) => {
                      return (
                        <div key={i} className="my-4 basis-[16%]">
                          <div className="mx-auto mb-2 h-[210px] w-[210px] cursor-pointer rounded-[20px]">
                            <div className="">
                              {isImage(x.filePath) ? (
                                <CustomCard
                                  item={{
                                    filePath: x.filePath,
                                  }}
                                  setIsPreview={setIsPreview}
                                  cardHeight="h-[200px]"
                                />
                              ) : (
                                <CustomCard
                                  item={{
                                    filePath: x.filePath,
                                    attachmentType: 'document',
                                  }}
                                  setIsPreview={setIsPreview}
                                  cardHeight="h-[200px]"
                                />
                              )}
                            </div>
                          </div>

                          {/* <h5 className="text-center text-[16px] font-extrabold">
                          {formatCurrency(x.quotationCost, 'PKR')}
                        </h5> */}
                          <h6 className="text-center text-sm opacity-[0.5]">
                            {' '}
                            {dayjs(x.createdAt).format('YYYY-MM-DD')}
                          </h6>
                        </div>
                      );
                    })
                ) : (
                  <div className="p-7">
                    <span>Quotations not uploaded yet.</span>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="TotalPaid" className="m-0">
              <div className="flex flex-wrap justify-start gap-[15px] p-5 ">
                {projectQuotations?.filter((a: any) => a.type === 'TOTAL_PAID')
                  ?.length ? (
                  projectQuotations
                    .filter((a: any) => a.type === 'TOTAL_PAID')
                    .map((x: any, i: number) => {
                      return (
                        <div key={i} className="my-4 basis-[16%]">
                          <div className="mx-auto mb-3 h-[210px] w-[210px] cursor-pointer rounded-[20px]">
                            <div className="flex h-full items-center justify-center">
                              {isImage(x.filePath) ? (
                                <CustomCard
                                  item={{
                                    filePath: x.filePath,
                                  }}
                                  setIsPreview={setIsPreview}
                                  cardHeight="h-[200px]"
                                />
                              ) : (
                                <CustomCard
                                  item={{
                                    filePath: x.filePath,
                                    attachmentType: 'document',
                                  }}
                                  setIsPreview={setIsPreview}
                                  cardHeight="h-[200px]"
                                />
                              )}
                            </div>
                          </div>
                          <h6 className="text-center text-sm opacity-[0.5]">
                            {' '}
                            {dayjs(x.createdAt).format('YYYY-MM-DD')}
                          </h6>
                        </div>
                      );
                    })
                ) : (
                  <div className="p-7">
                    <span>Total Paid not uploaded yet.</span>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="Labor" className="m-0">
              <div className="mb-3 flex flex-wrap justify-start  gap-[15px] p-5">
                {projectQuotations?.filter((a: any) => a.type === 'LABOR_PAID')
                  ?.length ? (
                  projectQuotations
                    .filter((a: any) => a.type === 'LABOR_PAID')
                    .map((x: any, i: number) => {
                      return (
                        <div key={i} className="my-4 basis-[16%]">
                          <div className="mx-auto mb-3 h-[210px] w-[210px] cursor-pointer rounded-[20px]">
                            <div className="flex h-full items-center justify-center">
                              {isImage(x.filePath) ? (
                                <CustomCard
                                  item={{
                                    filePath: x.filePath,
                                  }}
                                  setIsPreview={setIsPreview}
                                  cardHeight="h-[200px]"
                                />
                              ) : (
                                <CustomCard
                                  item={{
                                    filePath: x.filePath,
                                    attachmentType: 'document',
                                  }}
                                  setIsPreview={setIsPreview}
                                  cardHeight="h-[200px]"
                                />
                              )}
                            </div>
                          </div>

                          {/* <h5 className="text-center text-[16px] font-extrabold">
                          {formatCurrency(x.laborCost, 'PKR')}
                        </h5> */}
                          <h6 className="text-center text-sm opacity-[0.5]">
                            {' '}
                            {dayjs(x.createdAt).format('YYYY-MM-DD')}
                          </h6>
                        </div>
                      );
                    })
                ) : (
                  <div className="p-7">
                    <span>Labor & Material not uploaded yet.</span>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
