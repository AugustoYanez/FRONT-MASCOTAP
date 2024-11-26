export enum Documento {
    Dni = "DNI",
    Cuil = "CUIL",
    Pasaporte = "PASAPORTE",
}

export enum Contacto {
    Whatsapp = "WHATSAPP",
    Sms = "SMS",
    Email = "EMAIL",
}

export enum Rol {
    Administrador = "ADMINISTRADOR",
    Usuario = "USUARIO"
}

export enum Estado{ // para las mascotas
    EnCasa = "EN MI HOGAR",
    Encontrada = "LO ENCONTRE",
    Perdida = "LO PERDI",
}

export enum tipoDato {
    string = "String",
    int = "Int",
    boolean = "Boolean",
    double = "Double"
}

export enum Solicitud {
    aceptado = "ACEPTADO",
    espera = "ESPERA",
    rechazado = "RECHAZADO"
}