import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { groupe } from '../model/groupe';
import { group } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http:HttpClient) { }

  getAllgroupe():Observable<groupe>{
    return this.http.get<groupe>("http://localhost:7000/getallGroupe");
  }

  addGroupe(groupe:any):Observable<groupe>
{
return this.http.post<groupe>("http://localhost:7000/addGroupe",groupe);
}
}
