import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ProductModel } from '../models/product.model';
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
    return this.http
      .get<ProductModel[]>(`${this.url}/products`)
      .pipe(map((res: any) => res.data));
  }

  authenticate(data) {
    return this.http
      .post(`${this.url}/accounts/authenticate`, data)
      .pipe(map((res: any) => res.data));
  }

  refreshToken() {
    return this.http
      .post(`${this.url}/accounts/refresh-token`, null, {
        headers: this.composeHeaders(),
      });
  }

  resetPassword(data) {
    return this.http
      .post(`${this.url}/accounts/reset-password`, data);
  }

  create(data) {
    return this.http.post(`${this.url}/accounts`, data);
  }

  getProfile() {
    return this.http
      .get(`${this.url}/customers`, {
        headers: this.composeHeaders(),
      })
      .pipe(map((res: any) => res.data[0]));
  }

  updateProfile(data) {
    const payload = Security.parseJwt(Security.getToken());
    const { document } = payload;

    return this.http
      .put(`${this.url}/customers/${document}`, data, {
        headers: this.composeHeaders(),
      })
      .pipe(map((res: any) => res.data));
  }
}
