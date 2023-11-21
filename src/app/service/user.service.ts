import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private cachedUserData: any[] = [];
  public UserDataFlag = false;
  constructor(private http:HttpClient) { }
  url="http://localhost:5242/api/Users";
  getAllUsers():Observable<any>
  {    
    if (this.UserDataFlag) {
      // Return cached data if available
      console.log("Api not fetched");
      return of(this.cachedUserData);
      
    } else {
      // Fetch data from API and cache it
      console.log("Api fetched");
      
      this.UserDataFlag = true;
      return this.http.get<any[]>(this.url).pipe(
        map((data) => {
          this.cachedUserData = data;
          return data;
        })
      );
    }
    
  }
  getUsersById(id:any):Observable<any>
  {
    return this.http.get<any[]>(this.url+"/"+id);
  }
  deleteUsersById(id:any):Observable<any>{
    this.UserDataFlag=false;
    return this.http.delete(this.url+"/"+ id);
  }
  putUserById(id:any,record:any):Observable<any>{
    this.UserDataFlag=false;
    return this.http.put(this.url+"/" + id,
    JSON.stringify(record),
    {
      headers: { 'Content-Type': 'application/json', },
    });
  }
  postUser(record:any):Observable<any>{
    this.UserDataFlag=false;
    return this.http.post<any>(this.url, JSON.stringify(record), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  getUserByEmail(email:string,password:string):Observable<any>{
    const url = `${this.url}/login?email=${email}&password=${password}`;
    return this.http.get<any[]>(url);
  }
}
