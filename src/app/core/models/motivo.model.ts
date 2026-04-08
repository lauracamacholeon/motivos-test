export interface Motivo {
  motivo: string;
  descripcion: string;
  tipo: string;
  tipo_motivo: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface MotivoRequest {
  que: number;
  tope: string;
  cmd: string;
  codigo: string;
  tipo: string;
  descripcion: string;
  tipo_motivo: string;
  iIdioma: number;
}

export interface DropdownOption {
  sOpcion: string;
  sValor: string;
}

export interface CatalogRequest {
  sTabla: string;
  sCampo: string;
  iIdioma: number;
}
