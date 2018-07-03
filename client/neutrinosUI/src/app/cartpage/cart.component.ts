import { Router } from '@angular/router';
import { ItemCart } from './../services/productservice';
import { AccessToken } from './../services/loginservices';
import { CartService } from './../services/cartservices';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  access: AccessToken = {}
  itemCarts: ItemCart[] = [];
  ngOnInit() {
    this.getData();
  }

  remove(cartId: string) {
    this.cartService.deleteFromCart(cartId)
      .then(res => {
        this.getData();
        alert("Deleted");
      })
      .catch(err => {
        alert(err);
      })
  }


  getData() {
    this.cartService.getCartData(this.access.userId).then(res => {
      this.itemCarts = res;
      console.log(res)
    })
  }
  constructor(private cartService: CartService, private cookies: CookieService, private router: Router) {
    if (cookies.get("userInfo") === undefined || cookies.get("userInfo") === "") {
      this.router.navigate(['']);
    }else{
      
    this.access = <AccessToken>JSON.parse(this.cookies.get("userInfo"))
    }
  }

}

