import { Documento, Contacto, Rol } from "./enums"
import { IMascota } from "./Mascota";


export interface IUsuario {
    nombre: string;
    apellido: string
    email: string;
    contrasena: string;
    nroDocumento: string;
    telefono: string;
    documento: Documento;
    contacto: Contacto;
    rol: Rol; 
    mascotas: IMascota[];
}

