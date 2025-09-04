export type Time = 'before' | 'after'

export type NpoFiltersType = {
    page: number;
    limit: number;
    value?: string;
    orderDate?: string;
    orderDateType?: Time;
    arrivalDate?: string;
    arrivalDateType?: Time; 
}

export type NpoOrder = {
  consec_docto: number;
  estado: number;
  Fecha: string;
  FechaEntrega: string;
  CodigoProveedor: string;
  RazonSocial: string;
  TotalItems: number;
  TotalCantidad: number;
  emails: string[];
};

