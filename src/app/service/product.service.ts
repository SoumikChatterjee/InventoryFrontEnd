import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cachedProductData: any[] = [];
  public ProductDataFlag = false;

  constructor(private http:HttpClient) { }
  url="http://localhost:5242/api/Products";
  getAllProducts():Observable<any>
  {
    if (this.ProductDataFlag) {
      // Return cached data if available
      console.log("Api not fetched");
      return of(this.cachedProductData);
      
    } else {
      // Fetch data from API and cache it
      console.log("Api fetched");
      
      this.ProductDataFlag = true;
      return this.http.get<any[]>(this.url).pipe(
        map(data => {
          this.cachedProductData = data;
          return data;
        })
      );
    }
    
  }
  getProductsById(id:any):Observable<any>
  {
    return this.http.get<any[]>(this.url+"/"+id);
  }
  deleteProductsById(id:any):Observable<any>{
    this.ProductDataFlag=false;
    return this.http.delete(this.url+"/"+ id);
  }
  putProductById(id:any,record:any):Observable<any>{
    this.ProductDataFlag=false;
    return this.http.put(this.url+"/" + id,
    JSON.stringify(record),
    {
      headers: { 'Content-Type': 'application/json', },
    });
  }
  postProduct(record:any):Observable<any>{
    this.ProductDataFlag=false;
    return this.http.post<any>(this.url, JSON.stringify(record), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
}
