import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import {  Router } from '@angular/router';
import { user } from '../model/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm : FormGroup
  user!:user

  constructor(
    private Router:Router,
    private fb:FormBuilder,
    private nttp:HttpClient,
     ) {
      this.angForm = this.fb.group({
        email: [''],
        password: ['']
      })}
  ngOnInit(): void {
    

  }
 
  onsubmit(){
    this.nttp.post<user>("http://localhost:7000/auth/login",this.angForm.value)
    .subscribe((data)=>{
      this.user=data
      if (data) {
        this.Router.navigate(["/home"]) 
        localStorage.setItem("token","admin")
      }else{
        alert("are you sure for your account !! ")
      }
      
  })}

}
