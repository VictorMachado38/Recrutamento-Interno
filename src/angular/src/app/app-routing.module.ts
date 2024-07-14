import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SelectProfileComponent} from "./components/select-profile/select-profile.component";
import {LoginComponent} from "./components/login/login.component";
import {RecruiterProfileComponent} from "./components/recruiter-profile/recruiter-profile.component";
import {AuthGuard} from "./service/auth/auth.guard";
import {NotFoundPageComponent} from "./components/not-found-page/not-found-page.component";
import {CandidateProfileComponent} from "./components/candidate-profile/candidate-profile.component";

const routes: Routes = [
  { path: '', component: SelectProfileComponent, pathMatch: 'full' }, //Liberada (Raiz)
  { path: '*', component: SelectProfileComponent }, // Liberada (Quando não encontrar nenhuma rota)
  { path: 'profile', component: SelectProfileComponent}, // Liberada
  { path: 'login', component: SelectProfileComponent }, // Liberada
  { path: 'login/:userType', component: LoginComponent }, // Liberada


  { path: 'home/recruiter/:login', component: RecruiterProfileComponent , canActivate: [AuthGuard] }, // Protegida
  { path: 'home/candidate/:login', component: CandidateProfileComponent, canActivate: [AuthGuard]  }, // Protegida

  // { path: 'init', component: InitComponent },
  // { path: 'vagas/form', component: VagasFormComponent, canActivate: [AuthGuard] }, // Protegida
  // { path: 'vagas/list', component: VagasListComponent, canActivate: [AuthGuard] }, // Protegida
  // { path: 'login', component: LoginComponent },
  // { path: 'develop', component: ViewVersionDevComponent }

  { path: 'not-found', component: NotFoundPageComponent }, // Liberada (Rota curinga)
  { path: '**', component: NotFoundPageComponent }, // Liberada (Rota curinga)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
