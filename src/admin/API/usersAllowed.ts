import Cookies from 'js-cookie';
import type { UserAllowedDTO } from '../assets/ts/types';

const baseURL = String(import.meta.env.VITE_BASE_APIGATEWAY);

export class UsersAllowedAPI {
    static async getUsersAllowed() {
        try {
            const token = Cookies.get('token');

            const res = await fetch(`${baseURL}/users-allowed`, { 
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

    static async giveAccess(userInfo: Omit<UserAllowedDTO, 'userID'>){
        try {
            const token = Cookies.get('token');

            const res = await fetch(`${baseURL}/users-allowed`, { 
                method : 'POST', credentials : 'include', headers : { 
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${token}`
                }, body: JSON.stringify(userInfo)
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data?.message)
            return { success: true, data }

        } catch (err: any) {
            return { success: false, message: err.message || 'Internal Server Error' }
        }
    }

    static async updateAccess(userID: number | null, userInfo: Omit<UserAllowedDTO, 'userID'>){
        try {
            const token = Cookies.get('token');

            const res = await fetch(`${baseURL}/users-allowed/${userID}`, { 
                method : 'PATCH', credentials : 'include', headers : { 
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${token}`
                }, body: JSON.stringify(userInfo)
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data?.message)
            return { success: true, data }

        } catch (err: any) {
            return { success: false, message: err.message || 'Internal Server Error' }
        }
    }
}