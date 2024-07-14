import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {PaginaRecrutradorDto} from "../../../model/dto/pagina-recrutrador.dto";
import {UsuarioDto} from "../../../model/dto/usuario.dto";
import {environment} from "../../../environments/environment";
import {CadastroVagaDto} from "../../../model/dto/cadastro-vaga.dto";

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent implements OnInit {


  /** Construtor */

  constructor(private _route: Router, private _http: HttpClient, private _activatedRoute: ActivatedRoute, private _messageService: MessageService) {
  }

  /** Atributos */

  paginaRecrutador: PaginaRecrutradorDto = new PaginaRecrutradorDto()
  usuario: UsuarioDto = new UsuarioDto()
  mostrarVisaoGeral: boolean = true;
  mostrarMeuPerfil: boolean = false;
  mostrarVagasAplicadas: boolean = false;
  mostrarCadastrarVagas: boolean = false;
  mostrarListarVagas: boolean = false;
  novaVaga: boolean = true;
  private apiUrl = environment.apiUrl;

  /** Métodos herdados */

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.login = params.get('login');
    });

    this.getDadosCliente("/usuario/" + this.login);
  }

  /** Métodos de requisição */

  getDadosCliente(url: string): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // this.notFound = false;
    this._http.get(`${this.apiUrl}${url}`, {headers}).subscribe({
      next: (v: any) => {
        this.usuario = v.data;
      },
      error: (err) => {
        // Lide com os erros aqui, se necessário
        this._route.navigate(['/not-found']);
        console.error('Erro na requisição', err);
      },
    });
  }

  /** Métodos auxiliares */

  sair() {
    localStorage.clear();
    this._route.navigate(['/login']);
  }

  mostrarPainel(painel: string) {
    this.mostrarVisaoGeral = false;
    this.mostrarMeuPerfil = false;
    this.mostrarCadastrarVagas = false;
    this.mostrarListarVagas = false;
    this.mostrarVagasAplicadas = false;

    switch (painel) {
      case 'visaoGeral':
        this.mostrarVisaoGeral = true;
        break;
      case 'meuPerfil':
        this.mostrarMeuPerfil = true;
        break;
      case 'cadastrarVagas':
        this.mostrarCadastrarVagas = true;
        this.novaVaga = true;
        break;
      case 'mostrarVagasAplicadas':
        this.mostrarVagasAplicadas = true;
        break;
      case 'listarVagas':
        this.mostrarListarVagas = true;
        //   setTimeout(() => {
        //     this.mostrarListarVagas = true;
        //
        // },3000)
        break;
    }
  }

  private login: string | null | undefined;
  private bbb: string | null | undefined;


  // this.paginaRecrutador?.usuario?.login = this._activatedRoute.snapshot.paramMap.get('userType');
  vagaSelecionada: CadastroVagaDto = new CadastroVagaDto();

  showMessage($event: any) {
    // severity: string, summary: string, detail: string
    this._messageService.add({
      severity: $event.severity,
      summary: $event.summary,
      detail: $event.detail
    });

  }

  editarVaga(vagaSelecionada: CadastroVagaDto) {
    this.mostrarPainel('cadastrarVagas');
    this.novaVaga = false;
    this.vagaSelecionada = vagaSelecionada;
  }
}
