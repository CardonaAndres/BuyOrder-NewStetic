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

export type OrderItemType = {
  rowid_item: number;
  item: string; 
  Referencia: string;
  Descripcion: string;
  id_tipo_docto: string;
  consec_docto: string;
  estado: number;
  Fecha: string;
  FechaEntrega: string;
  CodigoProveedor: string;
  RazonSocial: string;
  emails: string[];
  CodigoBodega: string;
  PrecioUnitario: number;
  Cantidad: number;
  CriterioMayor: string;
  TotalLinea: number
}
