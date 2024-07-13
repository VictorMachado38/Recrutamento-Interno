import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClientFormComponent} from './components/client-form/client-form.component';
import {ClientListComponent} from './components/client-list/client-list.component';
import {TabMenuModule} from "primeng/tabmenu";
import {RouterModule} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {MenubarModule} from "primeng/menubar";
import {ChipsModule} from "primeng/chips";
import {InputMaskModule} from "primeng/inputmask";
import {cnpj} from 'cpf-cnpj-validator';
import {GMapModule} from "primeng/gmap";
// import {MapComponent} from './map/map.component';
import {CommonModule} from "@angular/common";
import {GoogleMapsModule} from "@angular/google-maps";
import {DialogModule} from "primeng/dialog";
import {CheckboxModule} from "primeng/checkbox";
import {MessageService} from "primeng/api";
import {ToggleButtonModule} from "primeng/togglebutton";
import {ToastModule} from "primeng/toast";
import { InitComponent } from './components/init/init.component';
import { VagasFormComponent } from './components/vagas-form/vagas-form.component';
import { VagasListComponent } from './components/vagas-list/vagas-list.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import {EditorModule} from "primeng/editor";
import { SelectProfileComponent } from './components/select-profile/select-profile.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileCandidateComponent } from './components/profile-candidate/profile-candidate.component';

@NgModule({
    declarations: [
        AppComponent,
        ClientFormComponent,
        ClientListComponent,
        // MapComponent,
        InitComponent,
        VagasFormComponent,
        VagasListComponent,
        SelectProfileComponent,
        LoginComponent,
        ProfileCandidateComponent
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
    EditorModule

  ],
    providers: [MessageService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
