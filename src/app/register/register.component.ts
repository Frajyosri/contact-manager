import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from '../model/user';


@Component({
  selector: 'app-register',
  templateUrl:'./register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regform:FormGroup
  User!:user;
  constructor(
   private router:Router,
     private rgb:FormBuilder,private http:HttpClient) { 

    this.regform = this.rgb.group({
      email: [''],
      password: [''],
      Cpassword:['']
    })
  }

  ngOnInit(): void {
  }

  onsubmit(){
    
    if (this.regform.value.password==this.regform.value.Cpassword) {
      this.http.post<any>("http://localhost:7000/auth/register",this.regform.value)
      .subscribe((data)=>{
        alert("sign up with succes ")
        this.regform.reset();
        this.router.navigate(['/login'])
      },err=>{
        alert("email already used ")
      })    
                
      }else{
        alert("incompatible password ")
        this.regform.reset()
      }
    }

    }

