import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientFormComponent} from "./components/client-form/client-form.component";
import {ClientListComponent} from "./components/client-list/client-list.component";
import {InitComponent} from "./components/init/init.component";
import {VagasFormComponent} from "./components/vagas-form/vagas-form.component";
import {VagasListComponent} from "./components/vagas-list/vagas-list.component";
import {SelectProfileComponent} from "./components/select-profile/select-profile.component";
import {LoginComponent} from "./components/login/login.component";
import {ApplicationManagerComponent} from "./components/application-manager/application-manager.component";
import {RecruiterProfileComponent} from "./components/recruiter-profile/recruiter-profile.component";

const routes: Routes = [
  {path:'',component: RecruiterProfileComponent  ,  pathMatch: 'full'}, //Raiz
  {path:'*',component: InitComponent }, //QUANDO NÃO ENCONTRAR NENHUMA ROTA
  {path:'form',component: ClientFormComponent},
  {path:'list',component: ClientListComponent},
  {path:'init',component: InitComponent},
  {path:'vagas/form',component: VagasFormComponent},
  {path:'vagas/list',component: VagasListComponent},
  {path:'profile',component: SelectProfileComponent},
  {path:'login',component: LoginComponent},
  // {path:'develop',component: ViewVersionDevComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
