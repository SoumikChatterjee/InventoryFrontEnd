import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';
import { Product } from 'src/app/models/Product';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  editFormGroup: FormGroup
  data: Product|undefined;
  id: string;
  constructor(private ps: ProductService, private fb: FormBuilder, private ar: ActivatedRoute, private router:Router, private os:OrderService) {
    this.id = ar.snapshot.params['id'];
    this.editFormGroup = fb.group({
      name: '',
      description: '',
      sku: '',
      manufacturer: '',
      category: '',
      price: '',
      quantity: '',
      sold: '',
      images:'',
      priceAgreement:''
    })
    this.ps.getProductsById(this.id).subscribe((res) => {
      this.data = res;
      this.fetchData();
    })
  }

  fetchData() {
    console.log(this.data);


    this.editFormGroup.patchValue({
      name: this.data?.name,
      description: this.data?.description,
      sku: this.data?.sku,
      category: this.data?.category,
      manufacturer: this.data?.manufacturer,
      price: this.data?.price,
      quantity: this.data?.quantity,
      sold: this.data?.sold,
      images:this.data?.images,
      priceAgreement:this.data?.priceAgreement
    });
  }
  submit() {
    const newProduct:Product = {
      id: this.data?.id??'',
      name: this.editFormGroup.get('name')?.value ?? '',
      description: this.editFormGroup.get('description')?.value ?? '',
      sku: this.editFormGroup.get('sku')?.value ?? '',
      category: this.editFormGroup.get('category')?.value ?? '',
      manufacturer: this.editFormGroup.get('manufacturer')?.value ?? '',
      price: this.editFormGroup.get('price')?.value ?? 0,
      priceAgreement: this.editFormGroup.get('priceAgreement')?.value ?? 0,
      quantity: this.editFormGroup.get('quantity')?.value ?? 0,
      sold: this.editFormGroup.get('sold')?.value ?? 0,
      images: this.editFormGroup.get('images')?.value ?? 0

    }
    console.log(newProduct);
    this.ps.putProductById(this.id,newProduct).subscribe((response) => {
      console.log(response);
      
      alert('Student updated successfully.');
      this.router.navigate(['']);
    })

  }
}
