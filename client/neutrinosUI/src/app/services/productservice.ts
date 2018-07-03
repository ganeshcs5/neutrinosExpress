import { Product } from './productservice';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/toPromise';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseRequestOptions } from '@angular/http/src/base_request_options';


@Injectable()
export class ProductService {

  constructor(private http: HttpClient, private cookies: CookieService) { }

  addProduct(product: Product) {
    return this.http.post('http://localhost:3000/product', product)
      .toPromise()
      .then(res => { return <Product[]>res; });
  }

  getProduct(email:string) {
    return this.http.get<Product[]>('http://localhost:3000/product/'+email)
      .toPromise()
      .then(res => { return <Product[]>res; });
  }

  addToCart(itemCart: ItemCart) {
    return this.http.post('http://localhost:3000/cart', itemCart)
      .toPromise()
      .then(res => { return <Product[]>res; });
  }
}

export interface Product {
  _id?: string,
  name?: string,
  price?: string,
  imagepath?: string,
  canAdd?:boolean
}

export interface ItemCart {
  email?: string,
  productId?: string
}

