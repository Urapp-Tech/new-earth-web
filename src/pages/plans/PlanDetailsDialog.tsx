import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Activity, ProjectPlan } from '@/interfaces/project-plans';

type DialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  plan?: ProjectPlan;
};

const PlanDetailsDialog: React.FC<DialogProps> = ({ open, setOpen, plan }) => {
  const toggleModal = (val: boolean) => {
    setOpen(val);
  };
  return (
    <Dialog open={open} onOpenChange={toggleModal}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[825px] lg:max-w-[1125px]">
        <DialogHeader>
          <DialogTitle>Day Activities</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">

        <div className="mt-2">
          <h3>
            <b>Project Name: </b> {plan?.projectName ?? ''}
          </h3>
          <h3>
            <b>Working Day: </b> {plan?.day ?? ''}
          </h3>
        </div>
          <table>
            <thead>
              <tr className="text-left">
                <th className='p-5'>Stage</th>
                <th className='p-5'>Room</th>
                <th className='p-5'>Activity</th>
                <th className='p-5'>Completed</th>
                <th className='p-5'>Remarks</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {plan &&
                plan.data &&
                plan.data.map((item: Activity, index: number) => {
                  return (
                    <tr key={index}>
                      <td className=" px-5 py-1">{item.stage ? item.stage : '--'}</td>
                      <td className=" px-5 py-1">{item.room ? item.room : '--'}</td>
                      <td className=" px-5 py-1">
                        {item.activity
                          ? item.activity
                            .split(',')
                            .map((activity, activityIndex) => {
                              return (
                                <span
                                  key={activityIndex}
                                  className="me-2 rounded-[15px] border border-grey bg-lightgrey px-2.5 py-0.5 text-xs font-medium text-secondary dark:bg-gray-700 dark:text-blue-300"
                                >
                                  {activity}
                                </span>
                              );
                            })
                          : '--'}
                      </td>
                      <td className=" px-5 py-1">
                        <Progress value={Number(item.progress)} className='dark:bg-primary' />
                      </td>
                      <td className=" px-5 py-1">{item.remarks ? item.remarks : '--'}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanDetailsDialog;
