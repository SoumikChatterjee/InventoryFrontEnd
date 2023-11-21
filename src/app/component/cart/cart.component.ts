import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
declare let Razorpay: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  orders: Array<Order> = [];
  Products: Array<Product> = [];
  constructor(private os: OrderService, private ps: ProductService, private au: AuthService, private router:Router) {
    os.getAllOrders().subscribe(res => {
      this.orders = res;
      this.orders = this.orders.filter((order) => {
        if (order.userType === 'User' && order.isPaid === false && au.user.email === order.userEmail)
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
    if (product[0] != undefined)
      return product[0].name;
    else
      return "-"
  }
  getProductImgUrlById(id: string) {
    const product = this.Products.filter((pr) => {
      return pr.id === id
    })
    if (product[0] != undefined)
      return product[0].images[0];
    return "...";
  }

  payment() {
    let total = 0;

    // use map to create an array of Promises 
    const promises = this.orders.map(async (order) => {
      order.isPaid = true; await this.os.putOrderById(order.id, order).toPromise(); const product = await this.ps.getProductsById(order.item).toPromise();

      product.quantity -= order.quantity;
      product.sold += order.quantity;
      total += product.price * order.quantity;

      await this.ps.putProductById(product.id, product).toPromise();
    });

    // wait for all the Promises to resolve and then log the total
    Promise.all(promises)
  .then(() => {
    console.log(total);
    this.payNow(total);
  })
  .then(() => {
    this.router.navigate(['/orders']);
  });
  }

  payNow(total: number) {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 100 * total,
      name: 'Sai',
      key: 'rzp_test_rmcimqjliEpGaY',
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      prefill: {
        name: 'sai kumar',
        email: 'sai@gmail.com',
        phone: '9898989898'
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed')
        }
      }
    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
      this.router.navigate(['/orders']);
    }

    const failureCallback = (e: any) => {
      console.log(e);
      this.router.navigate(['/orders']);
    }

    try {
      Razorpay.open(RozarpayOptions, successCallback, failureCallback);
    } catch(error) {
      console.log('Error:', error);
    }

  }
  
}
