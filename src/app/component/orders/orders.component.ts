import { Component } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  Orders: Array<Order> = [];
  Products:Array<Product>=[];

  constructor(private os: OrderService, public ps: ProductService, public au: AuthService) {
    this.os.getAllOrders().subscribe(res => {
      this.Orders = res;
      this.Orders = this.Orders.filter((order) => {
        if (order.userType == 'User' && order.userEmail==au.user.email && order.isPaid==true)
          return true;
        else
          return false;
      })
    })
    this.ps.getAllProducts().subscribe(res=>{
      this.Products=res;
    })
  }
  getProductNameById(id: string) {
    const product=this.Products.filter((pr)=>{
      return pr.id===id
    })
    if(product[0]!=undefined)
    return product[0].name;
    else
    return "-"
  }
  getProductImgUrlById(id:string){
    const product=this.Products.filter((pr)=>{
      return pr.id===id
    })   
    if(product[0]!=undefined)
    return product[0].images[0];
  return "...";
  }

}

