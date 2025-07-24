import axiosInstance from '@/api/axiosInstance';
import assets from '@/assets';
import { toast } from '@/components/ui/use-toast';
import { login } from '@/redux/features/authStateSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { Eye, EyeOff } from 'lucide-react';
import promiseHandler from '@/utils/promise-handler';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const [, setIsLoader] = useState(false);
  const { systemConfig } = useAppSelector((x) => x.appState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    if (!systemConfig?.tenant) {
      return;
    }
    // Handle form submission
    setIsLoader(true);

    const [loginResponse] = await promiseHandler(
      axiosInstance.post('/app/app-user/sign-in/app', {
        email: data.username,
        password: data.password,
        tenant: systemConfig?.tenant,
      })
    );
    setIsLoader(false);

    if (!loginResponse) {
      toast({
        title: 'Error while signing in',
        variant: 'destructive',
        className: '--radix-toast-swipe-move-y',
        style: {
          position: 'fixed',
          left: '20px',
          top: '20px', // Adjust to your desired top position
          transform: 'translateX(0%)',
          width: '30%',
          backgroundColor: '#f27426',
          color: '#fff',
        },
      });
      return;
    }
    if (!loginResponse.data.success) {
      toast({
        title: 'Error while signing in',
        variant: 'destructive',
        description: loginResponse.data.message,
        style: {
          position: 'fixed',
          left: '20px',
          top: '20px', // Adjust to your desired top position
          transform: 'translateX(0%)',
          width: '30%',
          backgroundColor: '#f27426',
          color: '#fff',
        },
      });
      return;
    }
    dispatch(login(loginResponse.data.data));
    navigate('/');
  };

  return (
    <div className="w-full">
      <div className="mx-auto  flex w-full  items-center justify-around max-[1560px]:items-center max-[1024px]:flex-col">
        <div className="my-[10px] h-screen w-[50%] self-center bg-white px-[30px] py-[10%] max-[1024px]:w-full">
          <div className=" mx-auto max-w-[460px]">
            <div className="py-[20px] ">
              <h1 className="text-center text-[64px] font-semibold leading-normal text-secondary">
                Welcome
              </h1>
            </div>
            <form
              className="mb-4 h-full bg-white px-1 pb-8 pt-6 max-[768px]:bg-transparent max-[480px]:py-1"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-4">
                <label
                  className="text-txt-color mb-2 block text-[12px] font-semibold"
                  htmlFor="username"
                >
                  Username or email
                </label>
                <input
                  {...register('username', {
                    required: 'Username is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address',
                    },
                  })}
                  className="text-txt-color w-full appearance-none rounded-[36px] border border-grey px-3 py-4 text-[16px] leading-tight focus:outline-none"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
                {errors.username && (
                  <p className="text-xs italic text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="relative mb-1">
                <label
                  className="text-txt-color mb-2 block text-[12px] font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className="text-txt-color mb-3 w-full appearance-none rounded-[36px] border  border-grey px-3 py-4 text-[16px] leading-tight focus:outline-none "
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="******************"
                />
                <button
                  type="button"
                  className="absolute right-5 top-[57%] -translate-y-1/2 transform text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="text-xs italic text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mb-2 flex items-center justify-end">
                {/* <button
              type="button"
              className="inline-block bg-transparent align-baseline text-[12px] font-bold text-primary"
              onClick={() => handleShowPasswordModalState(true)}
            >
              Forgot Password?
            </button> */}
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="leading-noramal focus:shadow-outline w-full rounded-[36px] bg-primary px-4 py-4 text-[18px] font-bold text-white focus:outline-none  max-[768px]:py-2 max-[768px]:text-[14px]"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
              {/* <div className="brk-points relative my-[20px] flex items-center justify-between opacity-[0.5]">
            <span className="block h-[1px] w-[45%] bg-primary" />
            <span className="block w-[10%] text-center text-txt-color">
              or
            </span>
            <span className="block h-[1px] w-[45%] bg-primary" />
          </div> */}
              <div className="my-[15px] flex justify-center text-center">
                {/* <span className="mr-1 block text-[12px] font-bold leading-normal text-heading-color">
              Are you new?{' '}
            </span> */}
                <div
                  className="cursor-pointer text-[12px] font-semibold text-primary"
                  onClick={() => {
                    // closeModal(false);
                    // openRegisterModal(true);
                  }}
                >
                  {/* Create an Account */}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-[50%] px-3 py-2 max-[1024px]:hidden max-[768px]:w-full max-[768px]:flex-1 max-[768px]:py-0">
          <div className="mx-auto  flex max-h-[834px] items-center justify-center overflow-hidden rounded-lg max-[1560px]:max-h-[96vh] max-[768px]:max-h-screen">
            <div className="flex">
              <div className="relative min-h-[984px] w-[735px] flex-1 overflow-hidden">
                <img
                  src={assets.images.splash1}
                  alt="Image 1"
                  className="ne-fade-image z-1 absolute left-0 top-0 h-full w-full object-contain opacity-0"
                />
                <img
                  src={assets.images.splash2}
                  alt="Image 2"
                  className="ne-fade-image z-1 absolute left-0 top-0 h-full w-full object-contain opacity-0"
                />
                <img
                  src={assets.images.splash3}
                  alt="Image 3"
                  className="ne-fade-image z-1 absolute left-0 top-0 h-full w-full object-contain opacity-0"
                />
                <img
                  src={assets.images.splash4}
                  alt="Image 4"
                  className="ne-fade-image z-1 absolute left-0 top-0 h-full w-full object-contain opacity-0"
                />
                <img
                  src={assets.images.splash5}
                  alt="Image 5"
                  className="ne-fade-image z-1 absolute left-0 top-0 h-full w-full object-contain opacity-0"
                />
                <img
                  src={assets.images.splash6}
                  alt="Image 6"
                  className="ne-fade-image z-1 absolute left-0 top-0 h-full w-full object-contain opacity-0"
                />
                <img
                  src={assets.images.splash7}
                  alt="Image 7"
                  className="ne-fade-image z-1 absolute left-0 top-0 h-full w-full object-contain opacity-0"
                />
                <img
                  src={assets.images.splash8}
                  alt="Image 8"
                  className="ne-fade-image z-1 absolute left-0 top-0 h-full w-full object-contain opacity-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
