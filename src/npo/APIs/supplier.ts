import Cookies from 'js-cookie';

const baseURL = String(import.meta.env.VITE_BASE_APIGATEWAY);

export class SuppliersAPI {
    static async getAllSuppliers (page: number = 1, limit: number = 30) {
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/suppliers/?page=${page}&limit=${limit}`, { 
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

    static async getNposBySearch(page = 1, limit = 30, filters: string = ""){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/np-orders/search/?page=${page}&limit=${limit}&${filters}`, { 
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