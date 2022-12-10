import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { groupe } from '../model/groupe';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  groupe:groupe={} as groupe
  constructor( private Gservice:GroupService,
    private router:Router,
    private refDialog:MatDialog) { }

  ngOnInit(): void {
  }
  addgroupe(f:NgForm){

    this.Gservice.addGroupe(f.value).subscribe((data)=>{
     console.log(data); 
     this.router.navigate(['/home'])
     this.refDialog.closeAll()
    })
   
  }
}
