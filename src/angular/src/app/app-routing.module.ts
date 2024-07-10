import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientFormComponent} from "./components/client-form/client-form.component";
import {ClientListComponent} from "./components/client-list/client-list.component";
import {InitComponent} from "./components/init/init.component";
import {VagasFormComponent} from "./components/vagas-form/vagas-form.component";
import {VagasListComponent} from "./components/vagas-list/vagas-list.component";
import {SelectProfileComponent} from "./components/select-profile/select-profile.component";

const routes: Routes = [
  {path:'',component: InitComponent  ,  pathMatch: 'full'},
  {path:'*',component: InitComponent },
  {path:'form',component: ClientFormComponent},
  {path:'list',component: ClientListComponent},
  {path:'init',component: InitComponent},
  {path:'vagas/form',component: VagasFormComponent},
  {path:'vagas/list',component: VagasListComponent},
  {path:'prfile',component: SelectProfileComponent},
  // {path:'develop',component: ViewVersionDevComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
