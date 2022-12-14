import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  userinfo:any;
  email:any;
  name:any;
  imgUrl:any;
  constructor(private api: ApiserviceService, private router: Router, private http: HttpClient) {
    this.userinfo = window.localStorage.getItem('email');
    this.email = this.userinfo;
    this.api.getNameByEmail(this.email).subscribe((res) => {
      this.name = res.data;
      this.imgUrl = res.body;
    })
  }
  readUser: any;
  errMsg: any;

  ngOnInit(): void {



  }
  propForm = new FormGroup({
    'title': new FormControl('', Validators.required),
    'info': new FormControl('', Validators.required),
    'address': new FormControl('', Validators.required),
    'city': new FormControl('', Validators.required),
    'img': new FormControl('', Validators.required),
    'nameUser': new FormControl(''),
    'imgUser': new FormControl(''),
  })

  propSubmit() {
    if (this.propForm.valid) {
      let title1 = this.propForm.value.title;
      let info1 = this.propForm.value.info;
      let address1 = this.propForm.value.address;
      let city1 = this.propForm.value.city;
      let img1 = this.propForm.value.img;
      
      this.propForm.value["nameUser"] = this.name;
      this.propForm.value["imgUser"] = this.imgUrl;
      console.log(this.propForm.value)
      this.api.createProperties(this.propForm.value).subscribe((res) => {
        alert("Succesfully Registered Property!")
        this.propForm.reset();
        this.router.navigateByUrl('/home');
      })

    }
    else {
      this.errMsg = "All fields required."
    }

  }

}
