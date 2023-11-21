import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor() { 
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
  fetchUserDetails()
  {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
}
