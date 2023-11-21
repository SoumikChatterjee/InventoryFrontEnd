import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './component/products/products.component';
import { SupplierComponent } from './component/supplier/supplier.component';
import { SalesOrderComponent } from './component/sales-order/sales-order.component';
import { PurchaseOrderComponent } from './component/purchase-order/purchase-order.component';
import { ReportComponent } from './component/report/report.component';
import { BarcodeComponent } from './component/barcode/barcode.component';
import { ExportImportComponent } from './component/export-import/export-import.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';
import { EditSupplierComponent } from './component/edit-supplier/edit-supplier.component';
import { OrdersComponent } from './component/orders/orders.component';
import { RoleGuard } from './guards/role.guard';
import { UserGuard } from './guards/user.guard';
import { CartComponent } from './component/cart/cart.component';

const routes: Routes = [
  {
    component:LoginComponent,
    path:"login"
  },
  {
    component:RegisterComponent,
    path:"register"
  },
  {
    component: HomeComponent,
    path: "",
    canActivate: [AuthGuard],
    children: [
      {
        component: ProductsComponent,
        path: "",
        canActivate: [AuthGuard]
      },
      {
        component: SupplierComponent,
        path: "supplier",
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        component: SalesOrderComponent,
        path: "sales-order",
        canActivate: [AuthGuard,RoleGuard]
      },
      {
        component: PurchaseOrderComponent,
        path: "purchase-order",
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        component: ReportComponent,
        path: "report",
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        component: BarcodeComponent,
        path: "barcode",
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        component: ExportImportComponent,
        path: "export-import",
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        component: ProductDetailsComponent,
        path: "product-details/:id",
        canActivate: [AuthGuard]
      },
      {
        component: EditProductComponent,
        path: "edit-product/:id",
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        component: AddProductComponent,
        path: "add-product",
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        component:UserListComponent,
        path:"user-list",
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        component:EditSupplierComponent,
        path:'edit-supplier/:id',
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        component:OrdersComponent,
        path:'orders',
        canActivate: [AuthGuard, UserGuard]
      },
      {
        component:CartComponent,
        path:'cart',
        canActivate:[AuthGuard,UserGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
