import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    // Aqui você pode implementar a lógica para verificar se o usuário está autenticado
    // Pode ser verificando um token no localStorage, fazendo uma chamada a um endpoint, etc.
    const token = localStorage.getItem('token');
    return !!token;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
