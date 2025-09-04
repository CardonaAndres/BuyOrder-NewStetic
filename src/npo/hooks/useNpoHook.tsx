import { useState } from "react";
import { NpoAPI } from "../API/npoAPI";
import { toast } from "react-toastify";
import { UtilClass } from "../assets/ts/utils";
import type { NpoFiltersType, NpoOrder } from "../assets/ts/types";
import type { MetaType } from "@/app/assets/ts/types";

export const useNpoHook = () => {
    const [loading, setLoading] = useState(false);
    const [npos, setNpos] = useState<NpoOrder[]>([]);
    const [meta, setMeta] = useState<MetaType>({    
        page: 1,
        limit: 30,
        total: 0,
        totalPages: 0
    });

    const getAllNpos = async (page = 1, limit = 30) => {
        try {
            setLoading(true);
            const res = await NpoAPI.getAllNpos(page, limit);

            if(!res.success) throw new Error(res.message);

            setMeta(res.data.meta)
            setNpos(res.data.results)
            
        } catch (err: any) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    const getNposBySearch = async (filters: NpoFiltersType) => {
        try {
            setLoading(true);

            const addToUrl = UtilClass.buildSearchParams(filters);
            const res = await NpoAPI.getNposBySearch((filters.page || 1), (filters.limit || 30), addToUrl);

            if(!res.success) throw new Error(res.message);
            console.log(res.data)
            setMeta(res.data.meta);
            setNpos(res.data.results);

        } catch (err: any) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    const clearFiltersAndReload = async () => await getAllNpos(1, 30);

    const changePageWithFilters = async (newPage: number, currentFilters?: NpoFiltersType) => {
        if (currentFilters) {
            const updatedFilters = { ...currentFilters, page: newPage };
            await getNposBySearch(updatedFilters);
        } else {
            await getAllNpos(newPage, meta.limit || 30);
        }
    }
    
    return {
        loading,
        getAllNpos,
        getNposBySearch,
        meta,
        npos,
        clearFiltersAndReload,
        changePageWithFilters
    }
}


