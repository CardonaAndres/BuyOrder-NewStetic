import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { router } from "@/app/configs/config";
import { LoadingScreen } from "@/app/components/LoadingScreen";

export const ProtectedRoute = () => {
    const { token } = Cookies.get();
    const { isAuth, loading } = useAuth();

    if(loading) return <LoadingScreen />
    if (!isAuth && !loading && !token) return <Navigate to={router.home} replace />;
  
    return <Outlet />;
}