import { toast } from '@/components/ui/use-toast';
import { handleShowLoginModal } from '@/redux/features/authModalSlice';
import { logout } from '@/redux/features/authStateSlice';
import { setRemoveProject } from '@/redux/features/projectSlice';
import { store } from '@/redux/store';
import { MAIN_BASE_URL, getTenantId, getToken } from '@/utils/constant';
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// Create a new Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: MAIN_BASE_URL,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // You can modify headers or do other request preprocessing here
    const token = getToken();
    if (token && token.trim().length > 0) {
      config.headers.Authorization = token;
      // config.headers.Authorization = `Bearer ${token}`;
    }
    const tenant = getTenantId();
    if (tenant && tenant.trim().length > 0) {
      config.headers.tenant = tenant;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // You can modify response data or do other postprocessing here
    return response;
  },
  (error) => {
    // Handle logout errors here (example: if response status is 401)
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
      store.dispatch(setRemoveProject());
      store.dispatch(handleShowLoginModal(true));
      toast({
        title: 'Authentication Error',
        description: error.response.data.message,
        variant: 'destructive',
      });
      // window.location.replace('/');
    }
    return Promise.reject(error);
  }
);

// Function to send multipart form data
export const sendMultipartFormData = async (
  url: string,
  formData: FormData
) => {
  const response = await axiosInstance.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default axiosInstance;
