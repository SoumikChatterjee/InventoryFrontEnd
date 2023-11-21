import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Order } from '../models/Order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private cachedOrderData: Order[] = [];
  public OrderDataFlag = false;

  url="http://localhost:5242/api/Order";
  constructor(private http:HttpClient) { }

  getAllOrders():Observable<Order[]>
  {
    if (this.OrderDataFlag) {
      // Return cached data if available
      console.log("Api not fetched");
      return of(this.cachedOrderData);
      
    } else {
      // Fetch data from API and cache it
      console.log("Api fetched");
      
      this.OrderDataFlag = true;
      return this.http.get<Order[]>(this.url).pipe(
        map(data => {
          this.cachedOrderData = data;
          return data;
        })
      );
    }
    
  }
  getOrdersById(id:string):Observable<Order>
  {
    return this.http.get<Order>(this.url+"/"+id);
  }
  deleteOrdersById(id:string):Observable<string>{
    this.OrderDataFlag=false;    
    return this.http.delete<string>(this.url+"/"+ id);
  }
  putOrderById(id:string,record:Order):Observable<Order>{
    this.OrderDataFlag=false;
    return this.http.put<Order>(this.url+"/" + id,
    JSON.stringify(record),
    {
      headers: { 'Content-Type': 'application/json', },
    });
  }
  postOrder(record:Order):Observable<Order>{
    this.OrderDataFlag=false;
    return this.http.post<Order>(this.url, JSON.stringify(record), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

}
