import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from "primeng/api";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AplicacaoDto} from "../../../model/dto/aplicacao.dto";
import {environment} from "../../../environments/environment";
import {CadastroVagaDto} from "../../../model/dto/cadastro-vaga.dto";

@Component({
  selector: 'app-vagas-list-candidate-apply',
  templateUrl: './vagas-list-candidate-apply.component.html',
  styleUrls: ['./vagas-list-candidate-apply.component.scss']
})
export class VagasListCandidateApplyComponent implements OnInit {


  /** Construtor */

  constructor(private _messageService: MessageService, private _http: HttpClient, private _router: Router) {
  }

  /** Atributos */

  vagas: any [] = [];
  aplicacao: AplicacaoDto = new AplicacaoDto();
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
  @Input()
  idUsuario?: number;
  private apiUrl = environment.apiUrl;

  /** Métodos herdados */

  ngOnInit(): void {

    setTimeout(() => {
      this.getClientes("/apply/list");
    },400)

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

  sendApply(idVaga: number) {
    const token = localStorage.getItem('token'); // Obtenha o token do localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    // window.alert(idVaga);
    this.aplicacao.idVaga = idVaga;
    // window.alert(this.idUsuario);
    this.aplicacao.idUsuario = this.idUsuario;

    this._http.post(`${this.apiUrl}/apply/save`, this.aplicacao, {headers}).subscribe({
      next: (retorno: any) => {
        // this.aplicacao = retorno.data;
        if (retorno.status === 200) {
          this._messageService.add({
            severity: 'success',
            summary: retorno.message,
            detail: retorno.description
          });

        } else if (retorno.status === 409) {
          this._messageService.add({
            severity: 'warn',
            summary: retorno.message,
            detail: retorno.description
          });

        } else {
          this._messageService.add({
            severity: 'error',
            summary: 'Error registering client'
          });
        }

      },
      error: (err) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Erro no servidor ao salvar a vaga'
        });
      },
    });

  }
}
