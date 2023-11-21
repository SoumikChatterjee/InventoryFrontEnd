import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  fg: FormGroup
  loginPending = false;
  constructor(private fb: FormBuilder, private us: UserService,private router:Router) {
    this.fg = fb.group({
      email: '',
      password: ''
    })
  }
  submit() {
    this.loginPending = true;
    // console.log(this.fg.value.email);
    // console.log(this.fg.value.password);
    this.us.getUserByEmail(this.fg.value.email,this.fg.value.password).subscribe((res) => {
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['/']); 

    }, (error) => {
      console.log(error);
      
      alert(error.error);
      this.loginPending = false;
    });
  }
}
