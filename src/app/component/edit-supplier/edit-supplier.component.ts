import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from 'src/app/models/Supplier';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss']
})
export class EditSupplierComponent {
  fg:FormGroup;
  id:string;
  supplier:Supplier|undefined;
  constructor(private ar:ActivatedRoute,private ss:SupplierService,private fb:FormBuilder, private router:Router){
    this.id=ar.snapshot.params['id'];
    console.log(this.id);
    this.fg=fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    })
    ss.getSuppliersById(this.id).subscribe(res=>{
      this.supplier=res;
      console.log(this.supplier);
      
      this.fetch();
    })
    
  }
  fetch(){
    this.fg.patchValue({
      name:this.supplier?.name,
      phone:this.supplier?.phone,
      email:this.supplier?.email
    })
  }
  submit(){
    const newSupplier:Supplier={
      id:this.supplier?.id??'',
      name:this.fg.value.name,
      email:this.fg.value.email,
      phone:this.fg.value.phone,
      products:this.supplier?.products??[]
    }
    this.ss.putSupplierById(this.id,newSupplier).subscribe(res=>{
      console.log(res);
      
      this.router.navigate(['/supplier'])
    });
  }

}
