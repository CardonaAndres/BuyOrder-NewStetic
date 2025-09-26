import Cookies from 'js-cookie';
import type { MessageTypeDTO } from '../assets/ts/types';

const baseURL = String(import.meta.env.VITE_BASE_APIGATEWAY);

export class MessageManagerAPI {
    static async getMessagesTypes(){
        try {
            const token = Cookies.get('token');

            const res = await fetch(`${baseURL}/messages`, { 
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

    static async create(messageInfo: Omit<MessageTypeDTO, 'messageID'>){
        try {
            const token = Cookies.get('token');

            const res = await fetch(`${baseURL}/messages`, { 
                method : 'POST', credentials : 'include', headers : { 
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${token}`
                }, body: JSON.stringify(messageInfo)
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data?.message)
            return { success: true, data }

        } catch (err: any) {
            return { success: false, message: err.message || 'Internal Server Error' }
        }
    }

    static async update(messageID: number | null, messageInfo: Omit<MessageTypeDTO, 'messageID'>){
        try {
            const token = Cookies.get('token');

            const res = await fetch(`${baseURL}/messages/${messageID}`, { 
                method : 'PATCH', credentials : 'include', headers : { 
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${token}`
                }, body: JSON.stringify(messageInfo)
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data?.message)
            return { success: true, data }

        } catch (err: any) {
            return { success: false, message: err.message || 'Internal Server Error' }
        }
    }
}