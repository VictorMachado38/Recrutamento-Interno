import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {CadastroVagaDto} from "../../../model/dto/cadastro-vaga.dto";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-vagas-form',
  templateUrl: './vagas-form.component.html',
  styleUrls: ['./vagas-form.component.scss']
})
export class VagasFormComponent implements OnInit {

  /** Construtor */


  constructor(private _http: HttpClient,
              private _messageService: MessageService,
              private _route: ActivatedRoute,
              private _location: Location) {
  }

  /** Atributos */

  cadastroVaga = new CadastroVagaDto();
  invalTitulo: boolean = false;
  invalDescricao: boolean = false;
  options: any;
  titlePage: string = 'Cadastrar vagas';
  @Input()
  novaVaga: boolean = true;
  @Input()
  vagaSelecionada: CadastroVagaDto = new CadastroVagaDto();
  @Output()
  showMessage = new EventEmitter<any>();
  private apiUrl = environment.apiUrl;

  /** Métodos herdados */

  ngOnInit(): void {
    const url = this._location.path();
    if (!this.novaVaga) {
      this.cadastroVaga = Object.assign({}, this.vagaSelecionada);
      this.titlePage = 'Editar vaga';
    } else {
      this.titlePage = 'Cadastrar vaga';
      this.cadastroVaga = new CadastroVagaDto();
    }
  }

  /** Métodos de requisição */

  sendForm() {
    // if()
    // window.alert("s")
    this.invalDescricao = false;
    this.invalTitulo = false;

    if (this.valid(this.cadastroVaga.descricao) || this.valid(this.cadastroVaga.titulo)) {
      if (this.valid(this.cadastroVaga.descricao)) {
        this.invalDescricao = true;
        this.showMessage.emit({
          severity: 'error',
          summary: 'O Título é obrigatório'
        })
        // this._messageService.add({
        //   severity: 'error',
        //   summary: 'O Título é obrigatório'
        // });
      }

      if (this.valid(this.cadastroVaga.titulo)) {
        this.invalTitulo = true;
        this.showMessage.emit({
          severity: 'error',
          summary: 'O Descrição é obrigatório'
        })
      }
      return;
    }


    const token = localStorage.getItem('token'); // Obtenha o token do localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this._http.post(`${this.apiUrl}/vaga/save`, this.cadastroVaga, {headers}).subscribe({
      next: (retorno: any) => {
        this.cadastroVaga = retorno.data;
        if (retorno.status === 200) {
          this._messageService.add({
            severity: 'success',
            summary: retorno.message,
            detail: retorno.description
          });

        } else {
          this._messageService.add({
            severity: 'error',
            summary: 'Error registering client'
          });
        }
        const data = retorno.data;

      },
      error: (err) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Erro no servidor ao salvar a vaga'
        });
      },
    });

  }

  /** Métodos auxiliares */

  novaVagaFunc() {
    this.novaVaga = true;
    this.titlePage = 'Cadastrar vaga';
    this.cadastroVaga = new CadastroVagaDto();
  }

  private valid(atributo: string | undefined) {
    return atributo === undefined || atributo === null || atributo.length <= 1;
  }
}
