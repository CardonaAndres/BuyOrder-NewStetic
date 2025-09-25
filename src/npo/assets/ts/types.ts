export type Time = 'before' | 'after'

export interface BasicFiltersType {
  page: number;
  limit: number;
  value?: string
}

export interface NpoFiltersType extends BasicFiltersType  {
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
  TotalLinea: number;
}

export type SupplierType = {
  RazonSocial: string;
  EmailsString: string;
  emails: string[];
}

export type EmailLogType = {
  email_log_id: number;
  estado: 'SUCCESS' | 'ERROR';
  error_mensaje: string | null;
  fecha: string;
}
