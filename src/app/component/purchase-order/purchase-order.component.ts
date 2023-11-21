import { Component } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent {

  Orders: Array<Order> = [];
  Products: Array<Product> = [];

  constructor(private os: OrderService, public ps: ProductService, public au: AuthService) {
    this.os.getAllOrders().subscribe(res => {
      this.Orders = res;
      this.Orders = this.Orders.filter((order) => {
        if (order.userType == 'Admin' || order.userType == 'Manager')
          return true;
        else
          return false;
      })
    })
    this.ps.getAllProducts().subscribe(res => {
      this.Products = res;
    })
  }
  getProductNameById(id: string) {
    const product = this.Products.filter((pr) => {
      return pr.id === id
    })
    console.log(product[0]);
    
    if (product[0]!= undefined)
      return product[0].name;
    else
      return "-";
  }
  getProductImgUrlById(id: string) {
    const product = this.Products.filter((pr) => {
      return pr.id === id
    })
    if (product[0] != undefined)
      return product[0].images[0];
    else
      return "...";
  }

}
