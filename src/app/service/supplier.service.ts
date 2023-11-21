import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Supplier } from '../models/Supplier';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private cachedSuppliertData: Supplier[] = [];
  public SupplierDataFlag = false;

  constructor(private http:HttpClient) { }
  url="http://localhost:5242/api/Supplier";
  getAllSuppliers():Observable<Supplier[]>
  {
    if (this.SupplierDataFlag) {
      // Return cached data if available
      console.log("Api not fetched");
      return of(this.cachedSuppliertData);
      
    } else {
      // Fetch data from API and cache it
      console.log("Api fetched");
      
      this.SupplierDataFlag = true;
      return this.http.get<Supplier[]>(this.url).pipe(
        map(data => {
          this.cachedSuppliertData = data;
          return data;
        })
      );
    }
    
  }
  getSuppliersById(id:string):Observable<Supplier>
  {
    return this.http.get<Supplier>(this.url+"/"+id);
  }
  getSupplierByName(name:string):Observable<Supplier>{
    return this.http.get<Supplier>(`http://localhost:5242/api/Supplier/getByName?name=${name}`);
  }
  deleteSuppliersById(id:string):Observable<string>{
    this.SupplierDataFlag=false;
    return this.http.delete<string>(this.url+"/"+ id);
  }
  putSupplierById(id:string,record:Supplier):Observable<Supplier>{
    this.SupplierDataFlag=false;
    return this.http.put<Supplier>(this.url+"/" + id,
    JSON.stringify(record),
    {
      headers: { 'Content-Type': 'application/json', },
    });
  }
  postSupplier(record:Supplier):Observable<Supplier>{
    this.SupplierDataFlag=false;
    return this.http.post<Supplier>(this.url, JSON.stringify(record), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  addProducts(name:string,pid:string):Observable<string>
  {
    this.SupplierDataFlag=false;
    return this.http.patch<string>(`http://localhost:5242/api/Supplier/push?name=${name}&pid=${pid}`, '');
  }
  deleteProducts(name:string,pid:string):Observable<string>
  {
    this.SupplierDataFlag=false;
    return this.http.patch<string>(`http://localhost:5242/api/Supplier/pop?name=${name}&pid=${pid}`, '');
  }
}
