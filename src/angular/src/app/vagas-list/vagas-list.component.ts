import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vagas-list',
  templateUrl: './vagas-list.component.html',
  styleUrls: ['./vagas-list.component.scss']
})
export class VagasListComponent implements OnInit {

  vagas: any [] = [];
  notFound: boolean = false;

  constructor(private _http: HttpClient,private _router: Router) {
  }

  ngOnInit(): void {
    // this.getClientes("http://172.19.0.19:8081/client/list");
    this.getClientes("http://18.229.131.192:8081/vaga/list");
  }
  getClientes(url: any) {
    this.notFound = false;
    this._http.get(`${url}`)
      .subscribe({
        next: (v:any) => {
          this.vagas =  v.data;
          if(this.vagas.length == 0)
            this.notFound = true;
        },
        error: (err) => {
          // this.erros.push(nome);
        },
      });
  }

  openVaga(vaga: any) {
    this._router.navigate(['/vagas/form'], { queryParams: vaga});

  }

}
