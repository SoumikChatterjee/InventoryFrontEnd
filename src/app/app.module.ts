import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './component/products/products.component';
import { SupplierComponent } from './component/supplier/supplier.component';
import { PurchaseOrderComponent } from './component/purchase-order/purchase-order.component';
import { SalesOrderComponent } from './component/sales-order/sales-order.component';
import { ReportComponent } from './component/report/report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import { BarcodeComponent } from './component/barcode/barcode.component';
import { ExportImportComponent } from './component/export-import/export-import.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { HomeComponent } from './component/home/home.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { MatTableModule } from '@angular/material/table';
import { EditSupplierComponent } from './component/edit-supplier/edit-supplier.component';
import { OrdersComponent } from './component/orders/orders.component';
import { ChartModule } from 'primeng/chart';
import { CartComponent } from './component/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    SupplierComponent,
    PurchaseOrderComponent,
    SalesOrderComponent,
    ReportComponent,
    BarcodeComponent,
    ExportImportComponent,
    ProductDetailsComponent,
    EditProductComponent,
    AddProductComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    EditSupplierComponent,
    OrdersComponent,
    CartComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule, BrowserAnimationsModule, SidebarModule,ButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ZXingScannerModule,
    MatTableModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
