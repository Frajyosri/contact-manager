import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { contact } from '../model/contact';
import { groupe } from '../model/groupe';
import { ContactService } from '../services/contact.service';
import { GroupService } from '../services/group.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
 Contact!:any
  constructor(private service:ContactService,
    private router:Router) { }

  ngOnInit(): void {
    this.service.getAllContact().subscribe((data)=>{
      this.Contact=data
    if (localStorage.getItem("token")==null) {
    this.router.navigate(["/login"])
      }
      
    })
   
  }
  delete(id:string){
   if(window.confirm("did you want to delete this contact ?")){
    this.service.deleteContact(id).subscribe((data)=>{
      this.service.getAllContact().subscribe((data)=>{
        this.Contact=data
      })
    })
   }    
  }
  
}
