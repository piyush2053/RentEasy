import { splitNsName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  validate = true;
  messageVisible = false;
  mobile: any;
  imageLoader = true;
  number1: any;
  input: any;
  bgColor: any;


  constructor(private api: ApiserviceService, private router: Router) {
    this.userinfo = window.localStorage.getItem('email');
    this.email = this.userinfo;
    // this.name2 = this.email.split("@");
    // this.name = this.name2[0]

  }
  ngOnInit(): void {
    this.bgColor = "white";
    this.api.getThemeColor().subscribe((res)=>{
      this.bgColor = res.data[0].bgcolor;
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
      console.log(this.readProps)
    })
  }
  logout() {
    window.localStorage.setItem("userStatus", '')
    this.router.navigateByUrl('');
  }
  call(mobile:any) {
    let number1 = mobile;
    alert(`No Dialer Available to call ${number1}`)
  }

  navigateToManage() {
    this.router.navigateByUrl('/delete');
  }

  

  navigateToAddProperty() {
    this.router.navigateByUrl('/add-property')
  }

  toInfo(title:any,nameUser:any,address:any,city:any,mobile:any,imgUser:any,img:any){
    window.localStorage.setItem("title",`${title}`)
    window.localStorage.setItem("nameUser",`${nameUser}`)
    window.localStorage.setItem("address",`${address}`)
    window.localStorage.setItem("city",`${city}`)
    window.localStorage.setItem("mobile",`${mobile}`)
    window.localStorage.setItem("imgUser",`${imgUser}`)
    window.localStorage.setItem("img",`${img}`)
    this.router.navigateByUrl('/info')
  }

}
