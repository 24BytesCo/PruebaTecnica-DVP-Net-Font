import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  data: string; // El segundo token JWT
  nbf: number;
  exp: number;
  iat: number;
}

interface NestedDecodedToken {
  UserId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  RoleName: string;
  RoleId: string;
  RoleCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {

  constructor() { }

  // Método para decodificar el token JWT principal
  decodeToken(token: string): DecodedToken | null {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Error al decodificar el token JWT', error);
      return null;
    }
  }

  // Método para decodificar el token JWT anidado en la propiedad 'data'
  decodeNestedToken(nestedToken: string): NestedDecodedToken | null {
    try {
      const decoded: NestedDecodedToken = jwtDecode(nestedToken);
      return decoded;
    } catch (error) {
      console.error('Error al decodificar el token JWT anidado', error);
      return null;
    }
  }

  // Método para verificar si el token ha expirado
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return decoded.exp < currentTime;
  }

  // Método para obtener información específica del token anidado
  getUserInfoFromToken(token: string) {
    const decoded = this.decodeToken(token);
    if (decoded && decoded.data) {
      // Decodificar el token anidado
      const nestedToken = decoded.data;
      return JSON.parse(this.decodeNestedToken(nestedToken)['data']);
    }
    return null;
  }
}
