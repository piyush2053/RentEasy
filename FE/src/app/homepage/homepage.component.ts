import { splitNsName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { count } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  userinfo: any;
  name: any;
  email: any;
  imgUrl: any;
  readProps: any;
  readCities: any;
  validate = true;
  messageVisible = false;
  mobile: any;
  imageLoader = true;
  number1: any;
  input: any;
  bgColor: any;
  countCity: any;


  constructor(private api: ApiserviceService, private router: Router) {
    this.userinfo = window.localStorage.getItem('email');
    this.email = this.userinfo;
    // this.name2 = this.email.split("@");
    // this.name = this.name2[0]

  }
  ngOnInit(): void {
    this.bgColor = "white";
    this.api.getThemeColor().subscribe((res)=>{
      this.bgColor = res.data;
      window.localStorage.setItem("themeColor",this.bgColor)
      document.body.style.backgroundColor = this.bgColor;
    })
    this.api.getNameByEmail(this.email).subscribe((res) => {
      this.name = res.data;
      this.imgUrl = res.body;
      if (window.localStorage.getItem('email') === "piyush.patel@rws.com") {
        this.validate = true;
        this.messageVisible = false
      }
      else {
        this.messageVisible = true
        this.validate = false;
      }
    })
    this.api.getProperty().subscribe((res) => {
      this.readProps = res.data;
      console.log(this.readProps.city)
    })
    this.api.getCities().subscribe((res) => {
      this.readCities = res.data;
      this.countCity = this.readCities.length
      console.log(this.countCity)
      
      
    })
  }
  logout() {
    window.localStorage.setItem("userStatus", '')
    this.router.navigateByUrl('');
  }
  navigateToManage() {
    this.router.navigateByUrl('/delete');
  }
  navigateToAddProperty() {
    this.router.navigateByUrl('/add-property')
  }

  toInfo(_id:any,title: any, nameUser: any, address: any, city: any, mobile: any, imgUser: any, img: any, price: any,views:any) {
    window.localStorage.setItem("Object Id mongo", `${_id}`)
    window.localStorage.setItem("title", `${title}`)
    window.localStorage.setItem("nameUser", `${nameUser}`)
    window.localStorage.setItem("address", `${address}`)
    window.localStorage.setItem("city", `${city}`)
    window.localStorage.setItem("mobile", `${mobile}`)
    window.localStorage.setItem("imgUser", `${imgUser}`)
    window.localStorage.setItem("img", `${img}`)
    window.localStorage.setItem("price", `${price}`)
    //adding views
    views = Number(views) + 1;
    let object1 = {
      "views": views,
      "_id": _id
    }
    this.api.viewsAdd(object1).subscribe((res: any) => {
      console.log(object1)
    })
    window.localStorage.setItem("views", `${views}`)
    this.router.navigateByUrl('/info')
  }

}
