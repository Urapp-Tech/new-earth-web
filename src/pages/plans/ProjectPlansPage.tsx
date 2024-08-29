import { Button } from "@/components/ui/button";
import { ProjectPlan } from "@/interfaces/project-plans";
import { fetchProjectPlans } from "@/redux/features/projectPlanSlice";
import { fetchProjects, setSelectedProject } from "@/redux/features/projectSlice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { sortArrayByKey } from "@/utils/helpers";
import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import PlanDetailsDialog from "./PlanDetailsDialog";



const ProjectPlansPage = () => {

    const dispatch = useAppDispatch();
    const [projectPlan, setProjectPlan] = useState<ProjectPlan>();
    const [showPlanDetails, setShowPlanDetails] = useState<boolean>(false);
    const { projects, selectedProjects } = useAppSelector(s => s.projectState);
    const { plans } = useAppSelector(s => s.projectPlanState);

    const fetchProjectsData = () => {
        dispatch(fetchProjects({}));
    }


    useEffect(() => {
        fetchProjectsData();
    }, [dispatch])

    useEffect(() => {
        if (projects.length > 0 && !selectedProjects) {
            dispatch(setSelectedProject(projects[0]))
        }
        if (selectedProjects) {

            dispatch(fetchProjectPlans({ project_id: selectedProjects.id }))
        }
    }, [projects, selectedProjects, dispatch])

    const handleProjectPlanSelection = (plan: ProjectPlan) => {
        setProjectPlan(plan);
        setShowPlanDetails(true);
    }

    return (
        <>
            <div className=" p-2 max-[1024px]:px-[40px] max-[768px]:p-0">
                <div className="text-[28px] text-secondary mb-5 max-[576px]:text-center">
                    Plans
                </div>
                <div className="bg-white  rounded-[20px]">
                    <table>
                        <thead>
                            <tr className="text-left">
                                <th className="w-[80%] p-5">Project Days</th>
                                <th className="w-[10%]  p-5">Activities Count</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortArrayByKey(plans, 'day', 'asc').map((plan, index) => {
                                let count = 0;
                                if (plan.data && plan.data.length > 0) {
                                    count = plan.data.reduce(
                                        // eslint-disable-next-line @typescript-eslint/no-shadow
                                        (total: number, item: any) =>
                                            total + (item?.count ?? 0),
                                        0
                                    );
                                }
                                return (
                                    <tr key={index} className="text-left border-grey-100 border-[1px]">
                                        <td className=" px-5 py-1">{plan.day}</td>
                                        <td className=" px-5 py-1 ">{count}</td>
                                        <td className=" px-2 py-1">
                                            <Button onClick={() => handleProjectPlanSelection(plan)} className="bg-transparent  my-[10px] rounded-[28px] w-[56px] h-[56px] btn-flips bg-[#F5F5F5] text-primary hover:bg-primary hover:text-white" >
                                                <EyeIcon />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                    <PlanDetailsDialog open={showPlanDetails} setOpen={(val) => setShowPlanDetails(val)} plan={projectPlan} />
                </div>
            </div>
        </>
    )
}

export default ProjectPlansPage