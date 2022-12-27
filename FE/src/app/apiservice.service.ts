import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  
  apiurl="https://renteasy-be.onrender.com/users"
  bgColorUrl="https://renteasy-be.onrender.com/bg-color"
  createdata="https://renteasy-be.onrender.com/user"
  auth="https://renteasy-be.onrender.com/auth"
  nameByEmail="https://renteasy-be.onrender.com/name"
  getProperties="https://renteasy-be.onrender.com/properties"
  createProperty="https://renteasy-be.onrender.com/create-properties"
  deleteProperty="https://renteasy-be.onrender.com/delete"
  mail1= "https://renteasy-be.onrender.com/sendmail"
  

  
  constructor(private http:HttpClient) { }
  
  //Only Observing the data 
  getAllUser():Observable<any>{
    return this.http.get(`${this.apiurl}`)
  }
  getThemeColor():Observable<any>{
    return this.http.get(`${this.bgColorUrl}`)
  }
  //create data
  createData(data:any):Observable<any>{
    return this.http.post(`${this.createdata}`,data)
  }
  //mail
  mailToUser(data:any):Observable<any>{
    return this.http.post(`${this.mail1}`,data)
  }

  //deletedata
  deleteData(id:any):Observable<any>{
    let ids = id;
    return this.http.delete(`${this.createdata}/${ids}`);
  
  }
  //auth
  authLogin(data:any):Observable<any>{
    return this.http.post(`${this.auth}`,data)
  }
//get name for display in homepage
  getNameByEmail(email: any):Observable<any>{
    return this.http.get(`${this.nameByEmail}/${email}`);
  }

  //api's for properties

  getProperty():Observable<any>{
    return this.http.get(`${this.getProperties}`)
  }

  deleteProperties(id:any):Observable<any>{
    let ids= id;
    return this.http.delete(`${this.deleteProperty}/${ids}`);
  }

  createProperties(data:any):Observable<any>{
    return this.http.post(`${this.createProperty}`,data)
  }
}
