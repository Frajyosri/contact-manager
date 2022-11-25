import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { contact } from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   host="http://localhost:7000/";

  constructor(private http:HttpClient) { }
//get all Contact 
  getAllContact():Observable<contact>{
    return this.http.get<contact>(this.host);
  }
  //contact by id 
 getContactById(id:any):Observable<contact>
{
return this.http.get<contact>(this.host+id);
}
//Add new Contact 
addContact(contact:contact):Observable<void>
{
return this.http.post<void>(this.host,contact);
}
//delete Contact 
deleteContact(id:any):Observable<void>{
  return this.http.delete<void>(this.host+id);
}
//Update Contact 
UpdateContact(contact:contact):Observable<contact>{
  return this.http.put<contact>(this.host,contact);
}
}
