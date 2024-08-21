
// import MainScreen from "@/pages/MainScreen";
import MainScreen from "@/pages/MainScreen";
import SecScreen from "@/pages/SecScreen";
import { Loader } from "lucide-react";
import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
// import MainLayout from "../components/Layout/MainLayout";

const MainLayout = lazy(() => import('@/components/Layout/MainLayout'))

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
                path: 'sec',
                element: <Suspense fallback={<Loader />}><SecScreen /></Suspense>,
            },
        ],
    },
];