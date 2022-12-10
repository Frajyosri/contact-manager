import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { contact } from '../model/contact';
import { ContactService } from '../services/contact.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
name!:string
Contact!:contact
  constructor(private route:Router,
    private service:ContactService) { }

  ngOnInit(): void {
  }
logout(){
  localStorage.removeItem("token");
  this.route.navigate(["/login"])
}

}
