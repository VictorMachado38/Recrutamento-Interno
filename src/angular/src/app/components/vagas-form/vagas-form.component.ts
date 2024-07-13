import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {CadastroVagaDto} from "../../../model/dto/cadastro-vaga.dto";

@Component({
  selector: 'app-vagas-form',
  templateUrl: './vagas-form.component.html',
  styleUrls: ['./vagas-form.component.scss']
})
export class VagasFormComponent implements OnInit, AfterViewInit, AfterViewChecked {

  constructor(private _http: HttpClient,
              private _messageService: MessageService,
              private _route: ActivatedRoute,
              private _location: Location) {
  }

  // apiLoaded: Observable<boolean>;
  cadastroVaga = new CadastroVagaDto();
  invalTitulo: boolean = false;
  invalDescricao: boolean = false;
  options: any;
  titlePage: string = 'Cadastrar vagas';


  ngOnInit(): void {
    const url = this._location.path();
    if (url !== '/vagas/form') {
      this.cadastroVaga = Object.assign({}, this._route.snapshot.queryParams);
      this.titlePage = 'Editar vaga';
    } else {
      this.titlePage = 'Cadastrar vagas';
      this.cadastroVaga = new CadastroVagaDto();
    }
    // this.options = {
    //   center: {lat: -16.688059517919058, lng: -49.26408132103648},
    //   zoom: 12
    // };
  }

  ngAfterViewInit(): void {
  }

  ngAfterViewChecked(): void {
  }

  sendForm() {
    // if()
    window.alert("s")
    this.invalDescricao = false;
    this.invalTitulo = false;

    if (this.valid(this.cadastroVaga.descricao) || this.valid(this.cadastroVaga.titulo)) {
      if (this.valid(this.cadastroVaga.descricao)) {
        this.invalDescricao = true;
        this._messageService.add({
          severity: 'error',
          summary: 'O Título é obrigatório'
        });
      }

      if (this.valid(this.cadastroVaga.titulo)) {
        this.invalTitulo = true;
        this._messageService.add({
          severity: 'error',
          summary: 'A Descrição é obrigatória'
        });
      }
      return;
    }


    this._http.post(`http://18.229.131.192:8081/vaga/save`, this.cadastroVaga).subscribe({
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

  private valid(atributo: string | undefined) {
    return atributo === undefined || atributo === null || atributo.length <= 1;
  }
}
