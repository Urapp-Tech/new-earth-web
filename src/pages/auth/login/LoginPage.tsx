import axiosInstance from "@/api/axiosInstance";
import { toast } from "@/components/ui/use-toast";
import { login } from "@/redux/features/authStateSlice";
import { handleShowForgotModal } from "@/redux/features/forgotPasswordSlice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import promiseHandler from "@/utils/promise-handler";
import { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";


interface LoginFormValues {
    username: string;
    password: string;
  }
  

const LoginPage = () =>{
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<LoginFormValues>();
    const [, setIsLoader] = useState(false);
  const { systemConfig } = useAppSelector((x) => x.appState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleShowPasswordModalState = (val: boolean) => {
    dispatch(handleShowForgotModal(val));
  };

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        if (!systemConfig?.tenant) {
          return;
        }
        // Handle form submission
        setIsLoader(true);
    
        const [loginResponse, loginError] = await promiseHandler(
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
            description: loginError.message,
          });
          return;
        }
        if (!loginResponse.data.success) {
          toast({
            title: 'Error while signing in',
            variant: 'destructive',
            description: loginResponse.data.message,
          });
          return;
        }
        dispatch(login(loginResponse.data.data));
        navigate('/');
      };

    return (
        <div className="w-full">
        <form
          className="mb-4 h-full bg-white px-1 pb-8 pt-6 max-[480px]:py-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="mb-2 block text-[12px] font-semibold text-txt-color"
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
              className="w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none"
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
          <div className="mb-1">
            <label
              className="mb-2 block text-[12px] font-semibold text-txt-color"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register('password', {
                required: 'Password is required',
              })}
              className="mb-3 w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none "
              id="password"
              type="password"
              placeholder="******************"
            />
            {errors.password && (
              <p className="text-xs italic text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-2 flex items-center justify-end">
            <button
              type="button"
              className="inline-block bg-transparent align-baseline text-[12px] font-bold text-primary"
              onClick={() => handleShowPasswordModalState(true)}
            >
              Forgot Password?
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="leading-noramal focus:shadow-outline w-full rounded bg-primary px-4 py-2 text-[12px] font-bold text-white focus:outline-none"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <div className="brk-points relative my-[20px] flex items-center justify-between opacity-[0.5]">
            <span className="block h-[1px] w-[45%] bg-primary" />
            <span className="block w-[10%] text-center text-txt-color">
              or
            </span>
            <span className="block h-[1px] w-[45%] bg-primary" />
          </div>
          <div className="my-[15px] flex justify-center text-center">
            <span className="mr-1 block text-[12px] font-bold leading-normal text-heading-color">
              Are you new?{' '}
            </span>
            <div
              className="cursor-pointer text-[12px] font-semibold text-primary"
              onClick={() => {
                // closeModal(false);
                // openRegisterModal(true);
              }}
            >
              Create an Account
            </div>
          </div>
        </form>
      </div>
    )
}

export default LoginPage;