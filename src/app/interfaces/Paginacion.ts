import { IMascota } from "./Mascota";

export interface IMascotaPaginada {
    mascotas: IMascota[]; // Lista de mascotas
    total: number; // Total de mascotas en el backend
    page: number; // Página actual
    limit: number; // Tamaño de página
  }