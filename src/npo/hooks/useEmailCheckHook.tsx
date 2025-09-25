import { useState } from "react";
import { toast } from "react-toastify";
import { EmailCheckAPI } from "../APIs/emailCheck";
import type { EmailLogType } from "../assets/ts/types";

export const useEmailCheckHook = () => {
    const [ loading, setLoading ] = useState(false);
    const [ logs, setLogs ] = useState<EmailLogType[] | []>([]);
    const [ meta, setMeta ] = useState({
        page: 0,
        limit: 15,
        totalLogs: 0,
        totalPages: 0
    }); 

    const getEmailLogs = async (page = 1, limit = 15) => {
        try {
            setLoading(true);

            const res = await EmailCheckAPI.getEmailLogs(page, limit);
            if(!res.success) throw new Error(res.message);

            setMeta(res.data.meta);
            setLogs(res.data.logs);

        } catch (err: any) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    return {
        logs,
        loading,
        getEmailLogs,
        meta
    }
}
