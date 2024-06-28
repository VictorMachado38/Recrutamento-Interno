import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular';


  items: MenuItem[] = [];

  ngOnInit() {

    // this.items = [
    //   {label: 'Lista de Clientes', icon: 'pi pi-server', routerLink: 'list'},
    //   {label: 'Cadatrar Cliente', icon: 'pi pi-server', routerLink: 'form'},
    //   {label: 'Versões desenvolvimento', icon: 'pi pi-server', routerLink: 'develop'},
    // ];


    this.items = [
      {
        label:'Usuários',
        icon:'pi pi-fw pi-user',
        items:[
          {
            label:'Aministrador',
            icon:'pi pi-user',
            items:[
              {
                label:'Cadastrar vagas',
                icon:'pi pi-plus',
                // routerLink: 'form'
                routerLink: 'vagas/form'

              },
              {
                label:'Listar vagas',
                icon:'pi pi-list',
                // routerLink: 'form'
                routerLink: 'vagas/list'

              }
            ]

          },
          {
            label:'Candidato - ❌',
            icon:'pi pi-user',

          }
        ]
      },
      {
        label: 'Requisitos',
        routerLink: 'init'
      }
    ];
  }
}
