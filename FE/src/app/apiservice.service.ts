import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  apiurl="http://localhost:3000/users"
  createdata="http://localhost:3000/user"
  auth="http://localhost:3000/auth"
  nameByEmail="http://localhost:3000/name"
  getProperties="http://localhost:3000/properties"
  createProperty="http://localhost:3000/create-properties"
  deleteProperty="http://localhost:3000/delete"
  mail1= "http://localhost:3000/sendmail"
  

  
  constructor(private http:HttpClient) { }
  
  //Only Observing the data 
  getAllUser():Observable<any>{
    return this.http.get(`${this.apiurl}`)
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
