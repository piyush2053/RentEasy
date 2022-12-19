import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private api: ApiserviceService,private router:Router) { }
  readProps: any;
  validate = true;
  messageVisible = false;

  ngOnInit(): void {
    this.api.getProperty().subscribe((res) => {
      this.readProps = res.data;
      if(window.localStorage.getItem('email') === "piyush.patel@rws.com"){
        this.validate = true;
        this.messageVisible = false
      }
      else{
        this.messageVisible = true
        this.validate = false;
      }
    })
    
  }

  navigateToAddProperty(){
    this.router.navigateByUrl('/add-property');
  }
  logout() {
    // let addButton = document.getElementById("addButton");
    // addButton?.remove();
    window.localStorage.setItem("userStatus",'')
    this.router.navigateByUrl('');
  }


  deleteUser(id:any){
    console.log(id,"-: Selected id")
    this.api.deleteProperties(id).subscribe((res)=>{
      console.log(res,"Property Deleted")
      window.location.reload();
    })
  }

  

  
}
