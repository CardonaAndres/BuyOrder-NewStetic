import { useState } from "react";
import { toast } from "react-toastify";
import { SuppliersAPI } from '../APIs/supplier';
import type { MetaType } from "@/app/assets/ts/types";
import type { CommentResponse } from "../assets/ts/types";

export const useSuppliersMessagesHook = () => {
    const [loading, setLoading] = useState(false);
    const [supplierMessages, setSupplierMessages] = useState<CommentResponse[] | []>([]);
    const [meta, setMeta] = useState<MetaType>({    
        page: 1,
        limit: 30,
        total: 0,
        totalPages: 0
    });

    const getSuppliersMessages = async (page = 1, limit = 10, value?: string) => {
        try {
            setLoading(true);
            const res = value && value?.trim() 
             ? await SuppliersAPI.getSuppliersMessagesBySearch(page, limit, value)
             : await SuppliersAPI.getSuppliersMessages(page, limit) 

            if(!res.success) throw new Error(res.message)

            setMeta(res.data.meta);
            setSupplierMessages(res.data.comments); 
            console.log(res.data.comments);

        } catch (err: any) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    return {
        meta,
        loading,
        supplierMessages,
        getSuppliersMessages,
    }
}
