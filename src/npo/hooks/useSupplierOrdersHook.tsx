import { useState } from "react";
import { toast } from "react-toastify";
import { SupplierOrders } from "../APIs/supplierOrders";
import type { NpoOrder } from "../assets/ts/types";

export const useSupplierOrdersHook = () => {
    const [npos, setNpos] = useState<NpoOrder[] | []>([]);
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const validateToken = async (token?: string) => {
        try {
            setLoading(true);

            const res = await SupplierOrders.validateToken(token);
            if(!res.success) throw new Error(res.message)

            setIsValid(true);
        } catch (err: any) {
            setIsValid(false); 
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    const pendingSupplerOrders = async (token?: string) => {
        try {
            setLoading(true);

            const res = await SupplierOrders.pendingSupplerOrders(token);
            if(!res.success) throw new Error(res.message)

            setNpos(res.data.npos)

        } catch (err: any) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    return {
        npos,
        loading,
        isValid,
        validateToken,
        pendingSupplerOrders
    }
}
