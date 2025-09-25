import { useState } from "react";
import { toast } from "react-toastify";
import { SuppliersAPI } from "../APIs/supplier";
import type { MetaType } from "@/app/assets/ts/types";
import type { NpoOrder, SupplierType } from "../assets/ts/types";

export const useSuppliersHook = () => {
    const [loading, setLoading] = useState(false);
    const [supplierOrders, setSupplierOrders] = useState<NpoOrder[] | []>([]);
    const [suppliers, setSuppliers] = useState<SupplierType[] | []>([]);
    const [meta, setMeta] = useState<MetaType>({    
        page: 1,
        limit: 30,
        total: 0,
        totalPages: 0
    });

    const getAllSuppliers = async (page = 1, limit = 20) => {
        try {
            setLoading(true);

            const res = await SuppliersAPI.getAllSuppliers(page, limit);
            if(!res.success) throw new Error(res.message)
            
            setSuppliers(res.data.results)
            setMeta(res.data.meta);
            
        } catch (err: any) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    const getSuppliersBySearch = async (page = 1, limit = 20, searchValue: string) => {
        try {
            setLoading(true);

            const res = await SuppliersAPI.getSuppliersBySearch(page, limit, `value=${searchValue}`)
            if(!res.success) throw new Error(res.message)

            setSuppliers(res.data.results);
            setMeta(res.data.meta);
            
        } catch (err: any) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    const getSupplierOrders = async (supplier: string) => {
        try {
            setLoading(true);

            const res = await SuppliersAPI.getSupplierOrders(supplier);
            if(!res.success) throw new Error(res.message);

            setSupplierOrders(res.data.npos);
            console.log(res.data.npos);

        } catch (err: any) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }
    
    return {
        loading,
        meta,
        getAllSuppliers,
        suppliers,
        getSuppliersBySearch,
        getSupplierOrders,
        supplierOrders
    }
}


