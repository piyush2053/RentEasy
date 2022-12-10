import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  constructor(private api: ApiserviceService,private router:Router) { }
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
  })

  propSubmit() {
    if (this.propForm.valid) {
      console.log(this.propForm.value);
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
