import { Activity, ProjectPlan } from '@/interfaces/project-plans';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

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
                                    className="me-2 rounded border border-blue-300 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-300"
                                  >
                                    {activity}
                                  </span>
                                );
                              })
                          : '--'}
                      </td>
                      <td className=" px-5 py-1">
                        <Progress value={Number(item.progress)} />
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
