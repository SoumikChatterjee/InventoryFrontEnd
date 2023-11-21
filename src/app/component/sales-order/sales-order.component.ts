import { Component } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.scss']
})
export class SalesOrderComponent {

  Orders: Array<Order> = [];
  Products:Array<Product>=[];

  constructor(private os: OrderService, public ps: ProductService, public au: AuthService) {
    this.os.getAllOrders().subscribe(res => {
      this.Orders = res;
      this.Orders = this.Orders.filter((order) => {
        if (order.userType == 'User' )
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
    {
      return "-";
    }
  }
  getProductImgUrlById(id:string){
    const product=this.Products.filter((pr)=>{
      return pr.id===id
    })   
    if(product[0]!=undefined)
    return product[0].images[0];
    else
    {
      return "...";
    }
  }

}
