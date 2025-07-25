import { useEffect, useState } from 'react';
import ImagePreview from '@/components/PreviewImageBox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchProjectQuotations } from '@/redux/features/projectQuotationSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { RootState } from '@/redux/store';
import dayjs from 'dayjs';
import assets from '@/assets';
import { useParams } from 'react-router-dom';
import CustomCard from '@/components/ImageBox';

export default function ProjectQuotation() {
  const dispatch = useAppDispatch();
  const { tab = 'TotalPaid' } = useParams();
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
        <div className="flex items-center justify-between mb-5 max-[768px]:flex-col">
          <div className="max-[576px]:text-[20px] p-3 text-[28px] text-secondary max-[768px]:text-[18px] max-[576px]:text-center">
            Project Quotations and Payments
          </div>
          <div className='flex items-center gap-3 max-[576px]:flex-col'>
            <span
              onClick={() => {
                setIsPreview({
                  state: true,
                  source: selectedProjects.bankDetails || assets.images.noFile,
                });
              }}
              className="me-6 cursor-pointer underline underline-offset-2"
            >
              View Bank Details
            </span>
            <span
              onClick={() => {
                setIsPreview({
                  state: true,
                  source:
                    selectedProjects.termsConditions || assets.images.noFile,
                });
              }}
              className="cursor-pointer underline underline-offset-2"
            >
              View Terms and Conditions
            </span>
          </div>
        </div>
        <div className="rounded-[20px]  bg-white">
          <Tabs defaultValue={tab} className="w-full ">
            <div className="tabs--head max-[768px]:overflow-y-hidden max-[768px]:overflow-x-scroll">
              <TabsList className="w-full justify-start p-0 max-[768px]:w-[780px] max-[576px]:w-[600px] max-[400px]:w-[500px]">
                <TabsTrigger
                  value="TotalPaid"
                  className="ne-tabs h-auto min-w-[184px] rounded-t-[20px]  p-[12px] shadow-none max-[768px]:min-w-[148px] max-[576px]:text-[16px] max-[480px]:text-[13px]"
                >
                  Billing
                </TabsTrigger>
                <TabsTrigger
                  value="Quotation"
                  className="ne-tabs h-auto min-w-[184px] truncate rounded-t-[20px] p-[12px] max-[768px]:min-w-[148px] max-[576px]:text-[16px] max-[480px]:text-[13px]"
                >
                  Project Quotation
                </TabsTrigger>
                <TabsTrigger
                  value="Labor"
                  className="ne-tabs h-auto min-w-[184px] rounded-t-[20px]  p-[12px] shadow-none max-[768px]:min-w-[148px] max-[576px]:text-[16px] max-[480px]:text-[13px]"
                >
                  Payments
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
                    <span>Billings not uploaded yet.</span>
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
                    <span>Payments not uploaded yet.</span>
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
