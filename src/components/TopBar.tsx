import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
// import assets from '../assets';
import {
  fetchProjects,
  setSelectedProject,
} from '@/redux/features/projectSlice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TopBar = () => {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(new Date());
  const { projects, selectedProjects } = useAppSelector((s) => s.projectState);

  useEffect(() => {
    dispatch(fetchProjects({}));
  }, [dispatch]);

  useEffect(() => {
    // Update the time every second
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  // console.log('user', selectedProjects);

  return (
    <div className="flex justify-end bg-lightgrey ">
      <div className="flex w-[90%] items-center justify-between p-5 max-[1024px]:gap-[15px]  max-[768px]:flex-col max-[576px]:justify-center">
        <div className="basis-[30%] max-[1024px]:basis-[25%] max-[768px]:w-full max-[768px]:text-center max-[460px]:basis-[40%] max-[400px]:basis-[55%]">
          <span className="block text-[24px] font-[500] capitalize leading-normal text-secondary max-[576px]:truncate max-[576px]:text-[20px] max-[360px]:text-[17px]">
            {selectedProjects?.name ?? ''}
          </span>
          <span className="block text-[16px] font-[500] capitalize leading-normal text-secondary max-[576px]:truncate max-[576px]:text-[20px] max-[360px]:text-[17px]">
            {selectedProjects?.type ?? ''}
          </span>
          {/* <hr className="h-[1px] w-[60%] border-none bg-[#000000]" /> */}
          <span className="block text-[14px] font-[400] capitalize leading-normal text-secondary max-[576px]:truncate max-[576px]:text-[20px] max-[360px]:text-[17px]">
            {selectedProjects?.address ?? ''}
          </span>
        </div>
        <div className="right-[4px] basis-[40%] max-[1024px]:basis-[65%] max-[768px]:w-full  ">
          <div className="flex items-center justify-between gap-4 max-[576px]:gap-0 max-[400px]:gap-2 max-[400px]:pr-[4px]">
            <div className="flex w-full items-center justify-end px-2 max-[768px]:justify-center max-[576px]:flex-col max-[576px]:gap-2 max-[400px]:p-0">
              <Select
                value={selectedProjects?.id}
                onValueChange={(value) =>
                  dispatch(
                    setSelectedProject(projects.find((x) => x.id === value))
                  )
                }
              >
                <SelectTrigger className="ne-tabs h-[40px] w-full rounded-[36px] border-0 border-none border-transparent bg-white shadow-none focus:border-transparent focus:ring-0 max-[576px]:w-full">
                  <SelectValue className="px-3" placeholder="Select Projects">
                    {projects.find(
                      (project) => project.id === selectedProjects?.id
                    )?.name || 'Select Projects'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {projects &&
                    projects.map((item, i) => (
                      <SelectItem key={i} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <div className="ml-2 h-[40px] w-[100px] rounded-[20px] bg-white p-[10px] text-center hover:bg-[#ccc] max-[400px]:w-[75px]">
                <span className="block text-[12px] font-medium leading-normal text-secondary">
                  {dayjs(time).format('hh:mm A')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
