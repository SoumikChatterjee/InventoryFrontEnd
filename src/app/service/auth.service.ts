import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor() { 
    this.user = JSON.parse(localStorage.getItem('user') || '');
  }
  fetchUserDetails()
  {
    this.user = JSON.parse(localStorage.getItem('user') || '');
  }
}
