import { useState } from "react";
import { toast } from "react-toastify";
import { SuppliersAPI } from "../APIs/supplier";
import type { MetaType } from "@/app/assets/ts/types";

export const useSuppliersHook = () => {
    const [loading, setLoading] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
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
    
    return {
        loading,
        meta,
        getAllSuppliers,
        suppliers
    }
}


