export interface LugarI {
  id: string;
  nombre: string;
  lng: number;
  lat: number;
  color: string;
}

export interface RespMarcadoresI {
  [key: string]: LugarI;
}
