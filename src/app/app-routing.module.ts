import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { EditcontactComponent } from './editcontact/editcontact.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"add",component:AddcontactComponent},
  {path:"home",component:HomepageComponent},
  {path:"login",component:LoginComponent},
  {path:"edit/:id",component:EditcontactComponent},
  {path:"register",component:RegisterComponent},
  {path:"",redirectTo:"/home",pathMatch:'full'},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
