
// import MainScreen from "@/pages/MainScreen";
import AuthLayout from "@/components/Layout/AuthLayout"
import { Loader } from "lucide-react";
import { lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
// import MainLayout from "../components/Layout/MainLayout";

const MainLayout = lazy(() => import('@/components/Layout/MainLayout'))
const LoginPage = lazy(() => import('../pages/auth/login/LoginPage'));
const MainScreen = lazy(() => import('@/pages/MainScreen'));
const GalleryScreen = lazy(() => import('@/pages/GalleryScreen'));


export const routeObjects: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Loader />}><MainScreen /></Suspense>,
            },
            {
                path: 'gallery',
                element: <Suspense fallback={<Loader />}><GalleryScreen /></Suspense>,
            },
        ],
    },
    {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          { index: true, element: <Navigate to="login" replace /> },
          {
            path: 'login',
            element: (
              <Suspense fallback={<Loader />}>
                <LoginPage />
              </Suspense>
            ),
          },
        ],
      },
];