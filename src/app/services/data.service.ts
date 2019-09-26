import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Security } from '../utils/security.util';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public url = environment.url;

  constructor(private readonly http: HttpClient) {}

  private composeHeaders() {
    const token = Security.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);

    return headers;
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  authenticate(data) {
    return this.http.post(`${this.url}/accounts/authenticate`, data);
  }

  refreshToken() {
    return this.http.post(`${this.url}/accounts/refresh-token`, null, {
      headers: this.composeHeaders(),
    });
  }

  resetPassword(data) {
    return this.http.post(`${this.url}/accounts/reset-password`, data);
  }

  create(data) {
    return this.http.post(`${this.url}/accounts`, data);
  }

  getProfile() {
    return this.http.get(`${this.url}/accounts`, {
      headers: this.composeHeaders(),
    });
  }

  updateProfile(data) {
    return this.http.put(`${this.url}/accounts`, data, {
      headers: this.composeHeaders(),
    });
  }
}
