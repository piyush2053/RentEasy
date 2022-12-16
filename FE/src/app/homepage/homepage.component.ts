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


  constructor(private api: ApiserviceService, private router: Router) {
    this.userinfo = window.localStorage.getItem('email');
    this.email = this.userinfo;
    // this.name2 = this.email.split("@");
    // this.name = this.name2[0]
  }
  ngOnInit(): void {
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
    })
  }
  logout() {
    this.router.navigateByUrl('');
  }
  call() {
    this.number1 = document.getElementById("callButton")?.innerText;
    alert(`No Dialer Available to call`)
  }

  navigateToManage() {
    this.router.navigateByUrl('/delete');
  }

  navigateToAddProperty() {
    this.router.navigateByUrl('/add-property')
  }

}
