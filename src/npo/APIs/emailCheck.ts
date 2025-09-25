import Cookies from 'js-cookie';

const baseURL = String(import.meta.env.VITE_BASE_APIGATEWAY);

export class EmailCheckAPI {
    static async getEmailLogs(page: number, limit: number) {
        try {
            const token = Cookies.get('token');

            const res = await fetch(`${baseURL}/email/logs?page=${page}&limit=${limit}`, { 
                method : 'GET', credentials : 'include', headers : { 
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${token}`
                } 
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data?.message)
            return { success: true, data }

        } catch (err: any) {
            return { success: false, message: err.message || 'Internal Server Error' }
        }
    }
}