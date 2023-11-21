import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';

import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { SupplierService } from 'src/app/service/supplier.service';
@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent {
  constructor(private ps: ProductService, private router: Router, private os: OrderService, private au: AuthService, private ss: SupplierService) { }

  availableDevices: MediaDeviceInfo[] = [];
  currentDevice: MediaDeviceInfo | undefined;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];



  qrResultString: string | undefined;
  isScanned = false;


  clearResult(): void {
    this.qrResultString = "";
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    console.log(this.qrResultString);
    //Add the product in db
    if (this.isScanned === false) {
      this.isScanned = true;
      this.ps.postProduct(JSON.parse(resultString)).subscribe((response) => {


        const date = new Date();
        this.os.postOrder({
          id: '',
          userEmail: "-",
          userType: this.au.user.role,
          orderDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          item: response.id,
          quantity: response.quantity
        }).subscribe(res => {
          console.log(res);
          this.router.navigate(['']);
        });

        this.ss.getSupplierByName(response.manufacturer).subscribe(res => {
          console.log(res);

          this.ss.addProducts(response.manufacturer, response.id).subscribe(r => {
            console.log(r);

          });
        }, (error) => {
          console.log(error);

          this.ss.postSupplier({
            id: '',
            name: response.manufacturer,
            email: '-',
            phone: '-',
            products: [response.id]
          }).subscribe(res => {
            console.log(res);

          });
        })

        this.router.navigate(['products']);
      })
    }
  }



}