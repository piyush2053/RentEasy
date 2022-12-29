import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
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

  call(){
    window.open(`https://wa.me/${this.mobile}?text=I%27m%20api%20msg%20Hello%20${this.nameUser}%20I%20am%20interested%20in%20your%20property%20${this.title}`, '_blank');
  }
  logout() {
    window.localStorage.setItem("userStatus", '')
    this.router.navigateByUrl('');
  }



}
