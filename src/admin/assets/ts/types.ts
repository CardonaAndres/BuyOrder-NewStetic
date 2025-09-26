export interface AdminOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  route: string;
  color: {
    primary: string;
    secondary: string;
    bg: string;
    border: string;
  };
  isActive?: boolean;
}

export interface UserAllowedResponse {
  usuario_id: number;
  username: string;
  email: string;
  num_documento: string;
  estado: 'Activo' | 'Inactivo';
}

export interface UserAllowedDTO {
  userID: number | null;
  username: string;
  email: string;
  numDoc: string;
  state: 'Activo' | 'Inactivo';
}

export interface MessageTypeResponse {
  mensaje_id: number;
  nombre: string;
  descripcion: string;
  estado: 'Activo' | 'Inactivo';
}

export interface MessageTypeDTO {
  messageID: number | null;
  name: string;
  description: string;
  state: 'Activo' | 'Inactivo';
}
