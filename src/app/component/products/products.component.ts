import { Component,OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { ActiveService } from 'src/app/service/active.service';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  loading = true;
  products: Array<Product> = [];
  filteredProducts: Array<Product> = [];
  constructor(private ps: ProductService, private as: ActiveService, public au: AuthService, private ss: SupplierService, private os: OrderService) {

    as.mySubject.subscribe((res) => {
      this.filteredProducts = this.products.filter((product) => {
        return product.name.toLowerCase().includes(res.toLowerCase());
      });
    })
  }
  ngOnInit() {
    this.ps.getAllProducts().subscribe((data) => {
      console.log(data);
      this.loading = false;
      this.filteredProducts = data;
      this.products = data;
    })
  }
  refreshProducts() {
    this.ps.getAllProducts().subscribe((data) => {
      console.log(data);
      this.loading = false;
      this.filteredProducts = data;
      this.products = data;
    })
  }
  deleteProduct(id: string) {
    let orders: Array<Order>;
    this.os.getAllOrders().subscribe(o => {
      orders = o;
      orders = orders.filter(order => order.item === id)
      console.log("Deleting product db");

      console.log(orders);
      orders.forEach(order => {

        this.os.deleteOrdersById(order.id).subscribe(r => {
          console.log(r);
          
         }, (error) => {
          console.log(error);
          
          });
      })

    })

    const pro = this.products.filter(p => p.id === id);
    this.ss.deleteProducts(pro[0].manufacturer, id).subscribe(r => {
      console.log(r);
      
    }, (error) => {
      console.log(error);
      
      this.ss.getSupplierByName(pro[0].manufacturer).subscribe(supplier => {
        if (supplier.products.length === 0) {
          this.ss.deleteSuppliersById(supplier.id).subscribe(r => {
            console.log(r);
            
           }, (error) => { 
            console.log(error);
            
           });
        }
      });
    })
    this.products = this.products.filter(p => p.id !== id);
    this.filteredProducts = this.filteredProducts.filter(p => p.id !== id);
    this.ps.deleteProductsById(id).subscribe((response) => {
      console.log(response);
      

    }, (error) => {
      console.log(error);
      

    });
  }

  order(id: string) {
    alert("Item Added");
    let orders: Array<Order>;

    //Getting all user to check whether same product is present or not, if present we will just increase the counter.
    this.os.getAllOrders().subscribe(r => {
      orders = r
      console.log(orders);

      //After fetching, applying filter depending upon the user type/name
      orders = orders.filter(order => {
        if (order.item === id) {
          if ((order.userType === 'Admin' || order.userType === 'Manager') && (this.au.user.role === 'Admin' || this.au.user.role === 'Manager')) {
            const date = new Date();
            if (order.orderDate === `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
              return true;
            else
              return false;

          }
          else if (order.userType === 'User' && this.au.user.role === 'User') {
            if (order.userEmail === this.au.user.email && order.isPaid === false)
              return true;
            else
              return false;
          }
          else {
            return false;
          }
        }
        else
          return false;
      })

      if (orders.length === 0) {
        const date = new Date();
        this.os.postOrder({
          id: '',
          userEmail: this.au.user.email,
          userType: this.au.user.role,
          orderDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          item: id,
          quantity: 1,
          isPaid: false
        }).subscribe(res => {
          console.log(res);
          
         })
      }
      else {
        orders[0].quantity = orders[0].quantity + 1;
        this.os.putOrderById(orders[0].id, orders[0]).subscribe(r => { 
          console.log(r);
          
        });
      }

      // Updating product stock
      if (this.au.user.role === 'User') {
        console.log();
        
      }
      else {
        this.ps.getProductsById(id).subscribe(r => {
          r.quantity += 1;
          console.log(r);

          this.ps.putProductById(r.id, r).subscribe(r2 => {
            console.log(r2);
            
            if (r.quantity === 10) {
              console.log("refreshed");
              this.refreshProducts();
            }
          });
        })
      }

    });


  }
  deleteOrder(id: string) {
    alert("Item Deleted");
    let orders: Array<Order>;
    this.os.getAllOrders().subscribe(r => {
      orders = r
      console.log(orders);

      orders = orders.filter(order => {
        if (order.item === id) {
          if ((order.userType === 'Admin' || order.userType === 'Manager') && (this.au.user.role === 'Admin' || this.au.user.role === 'Manager')) {
            return true;
          }
          else if (order.userType === 'User' && this.au.user.role === 'User') {
            if (order.userEmail === this.au.user.email && order.isPaid === false)
              return true;
            else
              return false;
          }
          else {
            return false;
          }
        }
        else
          return false;
      })

      if (orders.length === 0) {

        console.log();
        
      }
      else {
        orders[0].quantity = orders[0].quantity - 1;
        if (orders[0].quantity > 0) {
          this.os.putOrderById(orders[0].id, orders[0]).subscribe(r => {
            console.log(r);
            
           });
        }
        else {

          this.os.deleteOrdersById(orders[0].id).subscribe(r => { 
            console.log(r);
            
          }, (error) => {
            console.log(error);
            
           });
        }
      }

      //Updating product stock
      this.ps.getProductsById(id).subscribe(r => {

        r.quantity += 1;
        r.sold -= 1;

        this.ps.putProductById(r.id, r).subscribe(r2 => {
          console.log(r2);
          
          if (r.quantity == 10) {
            console.log("refreshed");
            this.refreshProducts();
          }
        });
      })

    });
  }
  handleButtonClick(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      event.target?.dispatchEvent(new MouseEvent('click'));
    }
  }
}
