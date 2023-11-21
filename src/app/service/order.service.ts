import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private cachedOrderData: any[] = [];
  public OrderDataFlag = false;

  url="http://localhost:5242/api/Order";
  constructor(private http:HttpClient) { }

  getAllOrders():Observable<any>
  {
    if (this.OrderDataFlag) {
      // Return cached data if available
      console.log("Api not fetched");
      return of(this.cachedOrderData);
      
    } else {
      // Fetch data from API and cache it
      console.log("Api fetched");
      
      this.OrderDataFlag = true;
      return this.http.get<any[]>(this.url).pipe(
        map(data => {
          this.cachedOrderData = data;
          return data;
        })
      );
    }
    
  }
  getOrdersById(id:any):Observable<any>
  {
    return this.http.get<any[]>(this.url+"/"+id);
  }
  deleteOrdersById(id:any):Observable<any>{
    this.OrderDataFlag=false;
    return this.http.delete(this.url+"/"+ id);
  }
  putOrderById(id:any,record:any):Observable<any>{
    this.OrderDataFlag=false;
    return this.http.put(this.url+"/" + id,
    JSON.stringify(record),
    {
      headers: { 'Content-Type': 'application/json', },
    });
  }
  postOrder(record:any):Observable<any>{
    this.OrderDataFlag=false;
    return this.http.post<any>(this.url, JSON.stringify(record), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

}
