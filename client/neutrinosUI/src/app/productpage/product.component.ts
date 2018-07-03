import { Router } from '@angular/router';
import { AccessToken } from './../services/loginservices';
import { ProductService, Product, ItemCart } from './../services/productservice';
import { LoginService, UserInfo, LoginDetails } from '../services/loginservices';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: Product[];
  upload: boolean = false;
  newProduct: Product = {};
  access:AccessToken = {};

  ngOnInit() {
    this.getProducts();
  }
  constructor(private productService: ProductService, private cookies: CookieService, private router: Router) {

    if (cookies.get("userInfo") === undefined || cookies.get("userInfo") === "") {
      this.router.navigate(['']);
    }else{
      this.access = <AccessToken>JSON.parse(this.cookies.get("userInfo"))
    }
  }

  getProducts() {
    this.productService.getProduct(this.access.userId).then(res => {
      this.products = res;
    }).catch(err => {
      alert("something went wrong");
    })
  }
  addToCart(product: Product) {
    let itemCart: ItemCart = {}
    itemCart.productId = product._id;
    product.canAdd = false;
    let access: AccessToken = <AccessToken>JSON.parse(this.cookies.get("userInfo"))
    itemCart.email = access.userId;
    this.productService.addToCart(itemCart).then(
      res => {
        console.log("successfully saved")
      }
    ).catch(err => {
      alert("something went wrong" + err)
    })
  }
  openNewUplad() {
    this.upload = !this.upload;
    this.newProduct = {};
  }
  closeUpdate(){
    this.upload = !this.upload;
    this.newProduct = {};
  }

  uploadData() {
    this.productService.addProduct(this.newProduct).then(
      res => {
        this.getProducts();
        console.log("successfully upload")
        this.upload = !this.upload;
      })
      .catch(err => {
        alert("Somthing went wrong")
      })

  }
}

