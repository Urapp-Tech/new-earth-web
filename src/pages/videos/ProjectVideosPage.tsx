import { fetchProjectAttachments } from '@/redux/features/projectAttachmentsSlice';
import {
  fetchProjects,
  setSelectedProject,
} from '@/redux/features/projectSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { sortArrayByKey } from '@/utils/helpers';
import { useEffect } from 'react';

const ProjectVideosPage = () => {
  const dispatch = useAppDispatch();
  const { projects, selectedProjects } = useAppSelector((s) => s.projectState);
  const { attachments } = useAppSelector((s) => s.projectAttachmentsState);

  const fetchProjectsData = () => {
    dispatch(fetchProjects({}));
  };

  useEffect(() => {
    fetchProjectsData();
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0 && !selectedProjects) {
      dispatch(setSelectedProject(projects[0]));
    }
    if (selectedProjects) {
      dispatch(fetchProjectAttachments({ project_id: selectedProjects.id }));
    }
  }, [projects, selectedProjects, dispatch]);

  return (
    <>
      <div className=" p-2 max-[1024px]:px-[40px] max-[768px]:p-0">
        <div className="mb-5 text-[28px] text-secondary  max-[576px]:text-center">
          Videos
        </div>
        <div className="tabs--head  mb-6 rounded-[20px] bg-white max-[992px]:overflow-y-hidden max-[992px]:overflow-x-scroll">
          <div className="max-[992px]:w-[1024px] ">
            <table>
              <thead>
                <tr className="text-left">
                  <th className="w-[20%] p-5">&nbsp;</th>
                  <th className="w-[30%] p-5">Project Day</th>
                  <th className="w-[10%]  p-5">Title</th>
                  <th className="w-[10%]  p-5">Description</th>
                  {/* <th>&nbsp;</th> */}
                </tr>
              </thead>
              <tbody>
                {sortArrayByKey(
                  attachments.filter((x: any) => x.attachmentType === 'video'),
                  'day',
                  'asc'
                ).map((plan: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      className="border-grey-100 border-[1px]  text-left"
                    >
                      <td className=" px-5 py-1">
                        <video
                          className="my-3 h-[150px] w-[300px] rounded-[20px]"
                          controls
                        >
                          <source src={plan.filePath} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </td>
                      <td className=" px-5 py-1">{plan.day}</td>
                      <td className=" px-5 py-1">{plan.title}</td>
                      <td className=" px-5 py-1">{plan.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectVideosPage;
