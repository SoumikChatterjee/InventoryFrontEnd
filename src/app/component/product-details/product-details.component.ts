import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  id:string|undefined;
  product:Product={
    "id": "string",
    "name": "string",
    "description": "string",
    "sku": "string",
    "category": "string",
    "manufacturer": "string",
    "price": 0,
    "priceAgreement": 0,
    "quantity": 0,
    "sold": 0,
    "images": [
      "string"
    ]
  };
  constructor(private ar:ActivatedRoute,private ps:ProductService,public au:AuthService){
    ps.getProductsById(ar.snapshot.params['id']).subscribe(res=>{
      this.product=res;
      console.log(res);
      
    });
    
  }
}
