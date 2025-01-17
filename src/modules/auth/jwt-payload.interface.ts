
export interface JwtPayload {
    email: string;            // Correo electrónico del usuario
    name: string;             // Nombre del usuario
    picture?: string;         // URL de la imagen de perfil (opcional)
    sub: string;              // Identificador único del usuario en Auth0 (subjet)
    roles?: string[];         // Roles del usuario, si se manejan en tu aplicación (opcional)
  }// src/auth/jwt-payload.interface.ts

  