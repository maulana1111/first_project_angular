import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllData(): Observable<any> {
    return this.http.get('https://dummyjson.com/products');
  }

  async getAllUser() {
    return [
      {
        namaProduct: 'Handphone',
        color: 'Silver',
        category: 'Smarthphone',
        price: '10000',
      },
      {
        namaProduct: 'Macbook',
        color: 'Black',
        category: 'Laptop',
        price: '520000',
      },
    ];
  }

}
