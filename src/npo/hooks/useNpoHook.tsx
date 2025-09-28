import { useState } from "react";
import { NpoAPI } from "../APIs/npo";
import { toast } from "react-toastify";
import { UtilClass } from "../assets/ts/utils";
import type { MetaType } from "@/app/assets/ts/types";
import type { NpoFiltersType, NpoOrder, OrderItemType } from "../assets/ts/types";

const getStatusColor = (state: number) => {
    switch (state) {
      case 1: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 2: return 'bg-yellow-200 text-yellow-900 border-yellow-400';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const getStatusText = (state: number) => {
    switch (state) {
        case 1: return 'Aprobado';
        case 2: return 'Parcial';
        default: return 'Desconocido';
    }
};

export const useNpoHook = () => {
    const [loading, setLoading] = useState(false);
    const [npos, setNpos] = useState<NpoOrder[]>([]);
    const [items, setItems] = useState<OrderItemType[]>([]);
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

    const getOrderItems = async (id: string, onClose: () => void) => {
        try {
            setLoading(true);

            const res = await NpoAPI.getOrderItems(id);
            if(!res.success) throw new Error(res.message);

            setItems(res.data.items)

        } catch (err: any) {
            onClose();
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    const getOrderItem = async (id: string) => {
        try {
            setLoading(true);

            const res = await NpoAPI.getOrderItem(id);
            if(!res.success) throw new Error(res.message);

            return res.data.item

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
        changePageWithFilters,
        getOrderItems,
        items,
        getStatusColor,
        getStatusText,
        getOrderItem
    }
}


