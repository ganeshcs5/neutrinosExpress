import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/toPromise';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseRequestOptions } from '@angular/http/src/base_request_options';
import { Product } from './productservice';


@Injectable()
export class CartService {

  constructor(private http: HttpClient, private cookies: CookieService) {

  }

  getCartData(email: string) {
    return this.http.get<Cart[]>('http://localhost:3000/cart/' + email)
      .toPromise()
      .then(res => { return <Cart[]>res; });
  }

  deleteFromCart(cartId: string) {
    return this.http.delete("http://localhost:3000/cart/" + cartId)
      .toPromise()
      .then(res => {
        return res;
      });

  }
}

export interface Cart {
  _id?:string,
  email?: string,
  product?: Product
}

