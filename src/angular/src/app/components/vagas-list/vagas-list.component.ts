import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {CadastroVagaDto} from "../../../model/dto/cadastro-vaga.dto";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-vagas-list',
  templateUrl: './vagas-list.component.html',
  styleUrls: ['./vagas-list.component.scss']
})
export class VagasListComponent implements OnInit {

  /** Construtor */

  constructor(private _http: HttpClient, private _router: Router) {
  }

  /** Atributos */

  vagas: any [] = [];
  notFound: boolean = false;
  coresVagas: string[] = ['#e06b7d', '#4CC5CD', '#96be4b', '#cba4db'];
  vagasFake: any[] = [
    {title: 'Vaga 1', startDate: '15 July', deadline: '15 August', progress: 35},
    {title: 'Vaga 2', startDate: '15 July', deadline: '15 August', progress: 63},
    {title: 'Vaga 3', startDate: '15 July', deadline: '15 August', progress: 75},
    {title: 'Vaga 4', startDate: '15 July', deadline: '15 August', progress: 50},
    {title: 'Vaga 5', startDate: '15 July', deadline: '15 August', progress: 20},
    // Adicione mais vagas conforme necessário
  ];
  @Output()
  editarVagaEvent = new EventEmitter<any>();
  private apiUrl = environment.apiUrl;

  /** Métodos herdados */

  ngOnInit(): void {
    // this.getClientes("http://172.19.0.19:8081/client/list");
    this.getClientes("/vaga/list");
  }

  /** Métodos de requisição */

  getClientes(url: string): void {
    const token = localStorage.getItem('token'); // Obtenha o token do localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.notFound = false;
    this._http.get(`${this.apiUrl}${url}`, {headers}).subscribe({
      next: (v: any) => {
        this.vagas = v.data;
        if (this.vagas.length === 0) {
          this.notFound = true;
        }
      },
      error: (err) => {
        // Lide com os erros aqui, se necessário
        console.error('Erro na requisição', err);
      },
    });
  }

  /** Métodos auxiliares */

  openVaga(vaga: any) {
    this._router.navigate(['/vagas/form'], {queryParams: vaga});
  }

  editarVaga(vaga: CadastroVagaDto) {
    this.editarVagaEvent.emit(vaga)
  }

  sendApply() {

  }
}
