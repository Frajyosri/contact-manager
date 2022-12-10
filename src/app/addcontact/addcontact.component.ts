import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddGroupComponent } from '../add-group/add-group.component';
import { contact } from '../model/contact';
import { groupe } from '../model/groupe';
import { ContactService } from '../services/contact.service';
import { GroupService } from '../services/group.service';


@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent implements OnInit {
group!:any
Contact:contact={} as contact
  constructor(private service:GroupService,
    private Cservice:ContactService,
    private router:Router,
    private refDialog:MatDialog
    ) {
   
   }

  ngOnInit(): void {
    this.service.getAllgroupe().subscribe((data)=>{
      this.group=data
      if (localStorage.getItem("token")==null) {
        this.router.navigate(["/login"])
          }
    })
  }
onsubmit(){
this.Cservice.addContact(this.Contact).subscribe((data)=>{
  if(data){
    alert("Contact add with sucsses ")
      this.router.navigate(['/home'])
  }

})

}
open(){
  this.refDialog.open(AddGroupComponent)
}
}
