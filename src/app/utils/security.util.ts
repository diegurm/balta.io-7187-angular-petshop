import { User } from '../models/user.model';

const _TOKEN = 'petshoptoken';
const _USER = 'petshopuser';

export class Security {
  public static set(user: User, token: string) {
    const data = JSON.stringify(user);

    localStorage.setItem(_USER, btoa(data));
    localStorage.setItem(_TOKEN, token);
  }

  public static setUser(user: User) {
    const data = JSON.stringify(user);
    localStorage.setItem(_USER, btoa(data));
  }

  public static getUser(): User {
    const data = localStorage.getItem(_USER);
    return data ? JSON.parse(atob(data)) : null;
  }

  public static setToken(token: string) {
    localStorage.setItem(_TOKEN, token);
  }

  public static getToken(): string {
    const data = localStorage.getItem(_TOKEN);
    return data ? data : null;
  }

  public static hasToken(): boolean {
    return this.getToken() ? true : false;
  }

  public static clear() {
    localStorage.removeItem(_USER);
    localStorage.removeItem(_TOKEN);
  }
  public static parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => ('%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)) )
        .join(''),
    );

    return JSON.parse(jsonPayload);
  }
}
