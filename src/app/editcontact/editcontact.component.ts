import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { contact } from '../model/contact';
import { groupe } from '../model/groupe';
import { ContactService } from '../services/contact.service';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-editcontact',
  templateUrl: './editcontact.component.html',
  styleUrls: ['./editcontact.component.css']
})
export class EditcontactComponent implements OnInit {
id!:any 
group:any
Contact:contact={} as contact
newContact:contact={} as contact
  constructor(private ar:ActivatedRoute,
    private service:GroupService,
    private Cservice:ContactService,
    private router:Router) { }

  ngOnInit(): void {
    this.ar.paramMap.subscribe((param)=>{
      this.id=param.get("id");
      if (localStorage.getItem("token")==null) {
        this.router.navigate(["/login"])
          }
    })
      this.service.getAllgroupe().subscribe((data)=>{
        this.group=data
      })
        if (this.id) {
          this.Cservice.getContactById(this.id).subscribe((data)=>{
            this.newContact=data
      }) 
  }
  }
  Editecontact(){
    this.Cservice.UpdateContact(this.Contact,this.id).subscribe((data)=>{
      console.log(data);
    })
  }
}
