import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  title: any;
  nameUser: any;
  address: any;
  city: any;
  mobile: any;
  imgUser: any;
  img: any;

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.title = window.localStorage.getItem("title")
    this.nameUser = window.localStorage.getItem("nameUser")
    this.address = window.localStorage.getItem("address")
    this.city = window.localStorage.getItem("city")
    this.mobile = window.localStorage.getItem("mobile")
    this.imgUser = window.localStorage.getItem("imgUser")
    this.img = window.localStorage.getItem("img")
  }
  logout() {
    window.localStorage.setItem("userStatus", '')
    this.router.navigateByUrl('');
  }

  call() {
    var PhoneNumber = this.mobile.text();
    PhoneNumber = PhoneNumber.replace('Phone:', '');
    window.location.href = 'tel://' + PhoneNumber;
    console.log('calling', this.mobile)
  }


}
