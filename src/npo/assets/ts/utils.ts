import type { NpoFiltersType } from "./types";

export class UtilClass {
    static buildSearchParams (filters: NpoFiltersType): string {
        const params = new URLSearchParams();
    
        if (filters.value && filters.value.trim() !== '') params.append('value', filters.value.trim());
        
        if (filters.orderDate && filters.orderDateType) {
            params.append('orderDate', filters.orderDate);
            params.append('orderDateType', filters.orderDateType);
        }
    
        if (filters.arrivalDate && filters.arrivalDateType) {
            params.append('arrivalDate', filters.arrivalDate);
            params.append('arrivalDateType', filters.arrivalDateType);
        }
    
        return params.toString();
    }
}