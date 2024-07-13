import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CadastroVagaDto} from "../../../model/dto/cadastro-vaga.dto";
import {LoginDto} from "../../../model/dto/login.dto";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  newUser: boolean = false;
  labelButton: string = !this.newUser ? 'Criar conta' : 'Entre na sua conta';

  constructor(private _http: HttpClient, private _messageService: MessageService,private _router: Router) {
  }

  ngOnInit(): void {
  }

  changeNewUser() {
    this.newUser = !this.newUser;
  }

  sendForm() {
    // if()
    // this.invalDescricao = false;
    // this.invalTitulo = false;
    //
    // if (this.valid(this.cadastroVaga.descricao) || this.valid(this.cadastroVaga.titulo)) {
    //   if (this.valid(this.cadastroVaga.descricao)) {
    //     this.invalDescricao = true;
    //     this._messageService.add({
    //       severity: 'error',
    //       summary: 'O Título é obrigatório'
    //     });
    //   }
    //
    //   if (this.valid(this.cadastroVaga.titulo)) {
    //     this.invalTitulo = true;
    //     this._messageService.add({
    //       severity: 'error',
    //       summary: 'A Descrição é obrigatória'
    //     });
    //   }
    //   return;
    // }

    window.alert(this.login)
    this._http.post(`http://localhost:8081/auth/login`, this.login).subscribe({
      next: (retorno: any) => {
        console.log(retorno)
        // this.login = retorno.data;
        if (retorno.status === 200) {
          this._router.navigate(['/vagas/form']);
          // window.location.replace(window.origin + "/vagas/form");
          console.log(retorno)
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

  login = new LoginDto();

}
