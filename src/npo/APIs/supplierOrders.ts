const baseURL = String(import.meta.env.VITE_BASE_APIGATEWAY);

export class SupplierOrders {
    static async validateToken(token?: string){
        try {
            const res = await fetch(`${baseURL}/supplier-orders/validate/${token}`, { 
                method : 'GET', credentials : 'include', headers : { 
                    'Content-Type': 'application/json', 
                } 
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data?.message)
            return { success: true, data }

        } catch (err: any) {
            return { success: false, message: err.message || 'Internal Server Error' }
        }
    }

    static async pendingSupplerOrders(token?: string){
        try {
            const res = await fetch(`${baseURL}/supplier-orders/pending/${token}`, { 
                method : 'GET', credentials : 'include', headers : { 
                    'Content-Type': 'application/json', 
                } 
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data?.message)
            return { success: true, data }

        } catch (err: any) {
            return { success: false, message: err.message || 'Internal Server Error' }
        }
    }

    static async findNpoItems(id: string, token?: string){
        try {
            const res = await fetch(`${baseURL}/supplier-orders/pending/${token}/${id}`, { 
                method : 'GET', credentials : 'include', headers : { 
                    'Content-Type': 'application/json', 
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