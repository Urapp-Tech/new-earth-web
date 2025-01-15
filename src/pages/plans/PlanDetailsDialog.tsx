import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { ProjectPlan } from '@/interfaces/project-plans';

type DialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  plan?: ProjectPlan;
};

const formatHeader = (key: string) => {
  return key.replace(/([a-z])([A-Z])/g, '$1 $2');
};

const fixedColumns = ['stage', 'room', 'activity', 'progress', 'remarks'];

const PlanDetailsDialog: React.FC<DialogProps> = ({ open, setOpen, plan }) => {
  const toggleModal = (val: boolean) => {
    setOpen(val);
  };

  const getColor = (value: any) => {
    if (value >= 0 && value <= 50) return '#FF0000'; // Red
    if (value >= 51 && value <= 99) return '#FFD700'; // Yellow
    if (value === 100) return '#008000'; // Green
    return '#1a90ff'; // Default color
  };
  return (
    <Dialog open={open} onOpenChange={toggleModal}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[825px] lg:max-w-[1325px]">
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
          <div className="relative overflow-x-auto">
            <table>
              <thead>
                <tr className="text-left">
                  {/* Render fixed columns */}
                  {fixedColumns.map((col) => (
                    <th className="p-5" key={col}>
                      {formatHeader(col.charAt(0).toUpperCase() + col.slice(1))}
                    </th>
                  ))}
                  {/* Render additional columns dynamically */}
                  {plan &&
                    plan.data &&
                    Object.keys(plan.data[0]).map((key) => {
                      if (!fixedColumns.includes(key)) {
                        return (
                          <th className="p-5" key={key}>
                            {formatHeader(
                              key.charAt(0).toUpperCase() + key.slice(1)
                            )}
                          </th>
                        );
                      }
                      return null;
                    })}
                </tr>
              </thead>
              <tbody>
                {plan &&
                  plan.data &&
                  plan.data.map((item: any, index: number) => {
                    const additionalColumns = Object.keys(item).filter(
                      (key) => !fixedColumns.includes(key)
                    );

                    return (
                      <tr key={index}>
                        <td className=" px-5 py-1">
                          {item.stage ? item.stage : '--'}
                        </td>
                        <td className=" px-5 py-1">
                          {item.room ? (
                            <span
                              key={item.room}
                              className="me-2 rounded-[15px] border border-grey bg-lightgrey px-2.5 py-0.5 text-xs font-medium text-secondary dark:bg-gray-700 dark:text-blue-300"
                            >
                              {item.room}
                            </span>
                          ) : (
                            '--'
                          )}
                        </td>
                        <td className=" whitespace-nowrap px-5  py-1 ">
                          {item.activity
                            ? item.activity
                                .split(',')
                                .map((activity: any, activityIndex: number) => (
                                  <span
                                    key={activityIndex}
                                    className="me-2 rounded-[15px] border border-grey bg-lightgrey px-2.5 py-0.5 text-xs font-medium text-secondary dark:bg-gray-700 dark:text-blue-300"
                                  >
                                    {activity}
                                  </span>
                                ))
                            : '--'}
                        </td>
                        <td className="px-5 py-1">
                          <div className="relative h-6 w-full rounded-full bg-gray-200">
                            <div
                              className="absolute left-0 top-0 h-full rounded-full"
                              style={{
                                width: `${item.progress}%`,
                                backgroundColor: getColor(item.progress),
                              }}
                            />
                            <span className="absolute inset-0 flex items-center justify-center font-semibold text-black">
                              {`${item.progress}%`}
                            </span>
                          </div>
                        </td>
                        <td>{item.remarks ? item.remarks : '--'}</td>
                        {/* Render additional columns dynamically */}
                        {additionalColumns.map((key: any) => (
                          <td className=" px-5 py-1" key={key}>
                            {item[key] ? item[key] : '--'}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanDetailsDialog;
