import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
 
  canActivate(): boolean {
    const user = this.authService.user;
    if (user.role === 'Manager' || user.role === 'Admin') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}