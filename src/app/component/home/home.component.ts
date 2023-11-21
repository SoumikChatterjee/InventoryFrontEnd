import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActiveService } from 'src/app/service/active.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  title = 'Inventory';
  list: NodeListOf<Element> | undefined;

  deltaForm: FormGroup;
  constructor(private fb: FormBuilder, private as: ActiveService, private router: Router, public au: AuthService) {
    this.deltaForm = fb.group({
      deltaControl: ''
    });

    this.deltaForm.valueChanges.subscribe((value) => {
      this.as.mySubject.next(value.deltaControl);
      this.activeLink(document.querySelectorAll('li')[1] as Element);
      router.navigate(['']);
    });
  }

  ngAfterViewInit() {
    this.list = document.querySelectorAll('.nav-custom li');
    this.list.forEach((item) => {
      console.log("clicked");
      item.addEventListener('click', () => {
        console.log("clicked");
        this.activeLink(item);
      });
    });
  }

  ngOnInit() {
    this.au.fetchUserDetails();
    this.list = document.querySelectorAll('.nav-custom li');
    this.list.forEach((item) => {
      console.log("clicked");
      item.addEventListener('click', () => {
        console.log("clicked");
        this.activeLink(item);
      });
    });

    const toogle = document.querySelector('.toogle') as HTMLElement;
    const navigation = document.querySelector('.nav-custom');
    const main = document.querySelector('.main');
    toogle.onclick = () => {
      navigation?.classList.toggle('active');
      main?.classList.toggle('active');
    }
  }

  activeLink(selected: Element) {
    console.log("Active link called");
    console.log(selected);

    this.list?.forEach((item) => {
      item.classList.remove('hovered');
    });

    selected.classList.add('hovered');
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}