import { Button } from '@/components/ui/button';
import { ProjectPlan } from '@/interfaces/project-plans';
import { fetchProjectPlans } from '@/redux/features/projectPlanSlice';
import {
  fetchProjects,
  setSelectedProject,
} from '@/redux/features/projectSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { sortArrayByKey } from '@/utils/helpers';
import { EyeIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import PlanDetailsDialog from './PlanDetailsDialog';

const ProjectPlansPage = () => {
  const dispatch = useAppDispatch();
  const [projectPlan, setProjectPlan] = useState<ProjectPlan>();
  const [showPlanDetails, setShowPlanDetails] = useState<boolean>(false);
  const { projects, selectedProjects } = useAppSelector((s) => s.projectState);
  const { plans } = useAppSelector((s) => s.projectPlanState);

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
  }, [projects]);

  useEffect(() => {
    if (selectedProjects) {
      dispatch(fetchProjectPlans({ project_id: selectedProjects.id }));
    }
  }, [selectedProjects, dispatch]);

  const handleProjectPlanSelection = (plan: ProjectPlan) => {
    setProjectPlan(plan);
    setShowPlanDetails(true);
  };

  return (
    <>
      <div className=" p-2 max-[1024px]:px-[40px] max-[768px]:p-0">
        <div className="mb-5 text-[28px] text-secondary max-[576px]:text-center">
          Plans
        </div>
        <div className="rounded-[20px]  bg-white">
          <table>
            <thead>
              <tr className="text-left">
                <th className="w-[85%] p-5">Project Days</th>
                <th className="w-[15%] p-5 2xl:w-[20%]">Activities Count</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {sortArrayByKey(plans, 'day', 'asc').map((plan, index) => {
                let count = 0;
                if (plan.data && plan.data.length > 0) {
                  count = plan.data.reduce(
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    (total: number, item: any) => total + (item?.count ?? 0),
                    0
                  );
                }
                return (
                  <tr
                    key={index}
                    className="border-grey-100 border-[1px] text-left"
                  >
                    <td className=" px-5 py-1">{plan.day}</td>
                    <td className="flex items-center px-5 py-1">
                      <span className="px-5">{count}</span>
                      <Button
                        onClick={() => handleProjectPlanSelection(plan)}
                        className="btn-flips  my-[10px] h-[56px] w-[56px] rounded-[28px] bg-[#F5F5F5] bg-transparent text-primary hover:bg-primary hover:text-white"
                      >
                        <EyeIcon />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <PlanDetailsDialog
            open={showPlanDetails}
            setOpen={(val) => setShowPlanDetails(val)}
            plan={projectPlan}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectPlansPage;
