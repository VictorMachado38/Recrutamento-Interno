import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TabMenuModule} from "primeng/tabmenu";
import {RouterModule} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {MenubarModule} from "primeng/menubar";
import {ChipsModule} from "primeng/chips";
import {InputMaskModule} from "primeng/inputmask";
import {GMapModule} from "primeng/gmap";
// import {MapComponent} from './map/map.component';
import {CommonModule} from "@angular/common";
import {GoogleMapsModule} from "@angular/google-maps";
import {DialogModule} from "primeng/dialog";
import {CheckboxModule} from "primeng/checkbox";
import {MessageService} from "primeng/api";
import {ToggleButtonModule} from "primeng/togglebutton";
import {ToastModule} from "primeng/toast";
import {VagasFormComponent} from './components/vagas-form/vagas-form.component';
import {VagasListComponent} from './components/vagas-list/vagas-list.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import {EditorModule} from "primeng/editor";
import {SelectProfileComponent} from './components/select-profile/select-profile.component';
import {LoginComponent} from './components/login/login.component';
import {RecruiterProfileComponent} from './components/recruiter-profile/recruiter-profile.component';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {SelectButtonModule} from "primeng/selectbutton";
import {CandidateProfileComponent} from './components/candidate-profile/candidate-profile.component';
import {VagasListCandidateComponent} from './components/vagas-list-candidate/vagas-list-candidate.component';
import {RippleModule} from "primeng/ripple";
import { VagasListCandidateApplyComponent } from './components/vagas-list-candidate-apply/vagas-list-candidate-apply.component';

@NgModule({
  declarations: [
    AppComponent,
    VagasFormComponent,
    VagasListComponent,
    SelectProfileComponent,
    LoginComponent,
    RecruiterProfileComponent,
    NotFoundPageComponent,
    CandidateProfileComponent,
    VagasListCandidateComponent,
    VagasListCandidateApplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
    RouterModule,
    ButtonModule,
    HttpClientModule,
    TableModule,
    BrowserAnimationsModule,
    FormsModule,
    MenubarModule,
    ChipsModule,
    InputMaskModule,
    GMapModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    DialogModule,
    CheckboxModule,
    ToggleButtonModule,
    ToastModule,
    InputTextareaModule,
    EditorModule,
    ReactiveFormsModule,
    SelectButtonModule,
    RippleModule

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
