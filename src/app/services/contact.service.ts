import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { contact } from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {;

  constructor(private http:HttpClient) { }
//get all Contact 
  getAllContact():Observable<contact>{
    return this.http.get<contact>("http://localhost:7000/getall");
  }
  //contact by id 
 getContactById(id:string):Observable<contact>
{
return this.http.get<contact>("http://localhost:7000/getall/"+id);
}
//Add new Contact 
addContact(Contact:contact):Observable<contact>
{
return this.http.post<contact>("http://localhost:7000/add",Contact);
}
//delete Contact 
deleteContact(id:any):Observable<void>{
  return this.http.delete<void>("http://localhost:7000/contact/"+id);
}
//Update Contact 
UpdateContact(contact:any,id:string):Observable<contact>{
  return this.http.put<contact>(`http://localhost:7000/update/${id}`,contact);
}
//Get Contact by name 
getContactByName(Name:string):Observable<contact>{
return this.http.get<contact>("http://localhost:7000/getbyname"+Name);
}
}
