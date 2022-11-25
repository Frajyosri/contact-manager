import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import {  Router } from '@angular/router';
import { user } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:UserService ) { }
  ngOnInit(): void {

  
  }
  user:any
  onsubmit(f:NgForm){
    console.log(f)
    this.service.getuser(f).subscribe(data=>{
      this.user=data
      console.log(this.user);
    })
  }

}
