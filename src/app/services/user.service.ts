import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  getuser(user:any){
    return this.http.get<user>("http://localhost:7000/auth/login",user);
  }
/*
  insertuser(user:any){
    return this.http.post("http://localhost:7000/auth/register",user)
  }*/
}
