import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { bindCallback } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorLogin: any;
  logged: boolean | undefined;
  loading = false;
  restElements = true;
  constructor(private api: ApiserviceService, private router: Router) { }
  readUser: any;
  ngOnInit(): void {
    document.body.style.background = "white";
  }
  loginForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  })

  login() {
    this.loading = true
    // this.restElements = false;
    let email1 = this.loginForm.value.email;
    window.localStorage.setItem('email', `${email1}`)
    if (this.loginForm.valid) {
      this.api.authLogin(this.loginForm.value).subscribe((res) => {
        console.log(res);
        // alert("Succesfully Login !")
        if (res.message === 'Logged in') {
          window.localStorage.setItem("userStatus", res.message)
          this.loading = false;
          this.router.navigateByUrl('/home');
          
        }
        else {
          alert("Wrong Credentials !")
        }

      })

    } else {
      this.errorLogin = "Wrong Credentials";
    }
  }


}




