import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private cachedUserData: User[] = [];
  public UserDataFlag = false;
  constructor(private http:HttpClient) { }
  url="http://localhost:5242/api/Users";
  getAllUsers():Observable<User[]>
  {    
    if (this.UserDataFlag) {
      // Return cached data if available
      console.log("Api not fetched");
      return of(this.cachedUserData);
      
    } else {
      // Fetch data from API and cache it
      console.log("Api fetched");
      
      this.UserDataFlag = true;
      return this.http.get<User[]>(this.url).pipe(
        map((data) => {
          this.cachedUserData = data;
          return data;
        })
      );
    }
    
  }
  getUsersById(id:User):Observable<User>
  {
    return this.http.get<User>(this.url+"/"+id);
  }
  deleteUsersById(id:string):Observable<string>{
    this.UserDataFlag=false;
    return this.http.delete<string>(this.url+"/"+ id);
  }
  putUserById(id:string,record:User):Observable<string>{
    this.UserDataFlag=false;
    return this.http.put<string>(this.url+"/" + id,
    JSON.stringify(record),
    {
      headers: { 'Content-Type': 'application/json', },
    });
  }
  postUser(record:User):Observable<User>{
    this.UserDataFlag=false;
    return this.http.post<User>(this.url, JSON.stringify(record), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  getUserByEmail(email:string,password:string):Observable<User>{
    const url = `${this.url}/login?email=${email}&password=${password}`;
    return this.http.get<User>(url);
  }
}
