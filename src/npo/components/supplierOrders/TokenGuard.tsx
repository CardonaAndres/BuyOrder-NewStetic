import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { AccessDeniedScreen } from "./AccessDeniedScreen";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { useSupplierOrdersHook } from "@/npo/hooks/useSupplierOrdersHook";

export const TokenGuard = () => {
    const { token } = useParams<{ token: string }>();
    const { validateToken, loading, isValid } = useSupplierOrdersHook();

    useEffect(() => {
        if (token) validateToken(token);
    }, [token]);

    if (loading) return <LoadingScreen />
    
    if (!isValid) return <AccessDeniedScreen />;
    
    return <Outlet />;
}
