import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cachedProductData: Product[] = [];
  public ProductDataFlag = false;

  constructor(private http:HttpClient) { }
  url="http://localhost:5242/api/Products";
  getAllProducts():Observable<Product[]>
  {
    if (this.ProductDataFlag) {
      // Return cached data if available
      console.log("Api not fetched");
      return of(this.cachedProductData);
      
    } else {
      // Fetch data from API and cache it
      console.log("Api fetched");
      
      this.ProductDataFlag = true;
      return this.http.get<Product[]>(this.url).pipe(
        map(data => {
          this.cachedProductData = data;
          return data;
        })
      );
    }
    
  }
  getProductsById(id:string):Observable<Product>
  {
    return this.http.get<Product>(this.url+"/"+id);
  }
  deleteProductsById(id:string):Observable<string>{
    this.ProductDataFlag=false;
    return this.http.delete<string>(this.url+"/"+ id);
  }
  putProductById(id:string,record:Product):Observable<Product>{
    this.ProductDataFlag=false;
    return this.http.put<Product>(this.url+"/" + id,
    JSON.stringify(record),
    {
      headers: { 'Content-Type': 'application/json', },
    });
  }
  postProduct(record:Product):Observable<Product>{
    this.ProductDataFlag=false;
    return this.http.post<Product>(this.url, JSON.stringify(record), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
}
