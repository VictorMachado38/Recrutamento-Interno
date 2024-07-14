import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginDto} from "../../../model/dto/login.dto";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth/AuthService";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  /** Construtor */

  constructor(private fb: FormBuilder, private _http: HttpClient, private _messageService: MessageService, private _router: Router, private _activatedRoute: ActivatedRoute, private _authService: AuthService) {
    this.sexOptions = [{label: 'M', value: 'M'}, {label: 'F', value: 'F'}];

  }

  /** Atributos */

  sexOptions: any[];
  newUserForm: FormGroup = new FormGroup({});
  newUser: boolean = false;
  userType: string = 'candidate';
  labelButton: string = !this.newUser ? 'Criar conta' : 'Entre na sua conta';
  credencial = new LoginDto();
  private apiUrl = environment.apiUrl;
  nome: string | number | null = '';

  /** Métodos herdados */

  ngOnInit(): void {
    // this.userType = this._activatedRoute.snapshot.paramMap.get('userType');
    this.credencial.tipoUsuario = this._activatedRoute.snapshot.paramMap.get('userType');
    // window.alert(this.credencial.userType)

    this.newUserForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(10)]],
      login: ['', [Validators.required, Validators.minLength(5), this.alphanumericValidator()]],
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required]],
      checkNewPassword: ['', [Validators.required]],
      sexo: ['M', []]
    }, {validator: this.passwordMatchValidator});
  }

  alphanumericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^[a-zA-Z0-9]*$/.test(control.value);
      return isValid ? null : {alphanumeric: true};
    };
  }

  passwordMatchValidator(form: FormGroup) {
    // @ts-ignore
    return form.get('newPassword').value === form.get('checkNewPassword').value
      ? null : {mismatch: true};
  }

  onSubmit() {
    if (this.newUserForm.valid) {

      this.credencial.nome = this.newUserForm.get('nome')?.value;
      this.credencial.login = this.newUserForm.get('login')?.value;
      this.credencial.email = this.newUserForm.get('email')?.value;
      this.credencial.senha = this.newUserForm.get('newPassword')?.value;
      this.credencial.sexo = this.newUserForm.get('sexo')?.value;
      // this.credencial.checkNewPassword = this.newUserForm.get('checkNewPassword').value;

      this.createLogin();
      console.log('Form Submitted!', this.newUserForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  /** Métodos de requisição */

  login() {
    if (!this.validCredencial())
      return;

    // window.alert(this.credencial)
    this._http.post(`${this.apiUrl}/auth/login`, this.credencial).subscribe({
      next: (retorno: any) => {
        // console.log(retorno)
        // this.login = retorno.data;
        if (retorno.status === 200) {
          // console.log(retorno)
          this._authService.setToken(retorno.token)
          // window.alert('parou')
          this._router.navigate(['/home', this.credencial.tipoUsuario, this.credencial.login]);

          // window.location.replace(window.origin + "/vagas/form");

          this._messageService.add({
            severity: 'success',
            summary: retorno.message || 'Sem Mensagem',
            detail: retorno.description || 'Sem Decrição',
            life: 60000
          });

        } else {
          this._messageService.add({
            severity: 'error',
            summary: retorno.message || 'Sem Mensagem',
            detail: retorno.description || 'Sem Decrição',
            life: 60000
          });
        }
        const data = retorno.data;

      },
      error: (retorno) => {

        if (retorno.status === 401) {
          this._authService.setToken(retorno.token)
          this._messageService.add({
            severity: 'warn',
            summary: 'Usuário ou senha inválidos'
          });
        }
      },
    });

  }

  createLogin() {
    // window.alert(this.credencial)
    this._http.post(`${this.apiUrl}/usuario`, this.credencial).subscribe({
      next: (retorno: any) => {
        if (retorno.status === 200) {
          this._authService.setToken(retorno.token)
          this.newUser = false;

          this._messageService.add({
            severity: 'success',
            summary: retorno.message || 'Sem Mensagem',
            detail: retorno.description || 'Sem Decrição',
            life: 60000
          });

        } else {
          this._messageService.add({
            severity: 'error',
            summary: retorno.message || 'Sem Mensagem',
            detail: retorno.description || 'Sem Decrição',
            life: 60000
          });
        }
        const data = retorno.data;

      },
      error: (retorno) => {

        if (retorno.status === 401) {
          this._authService.setToken(retorno.token)
          this._messageService.add({
            severity: 'warn',
            summary: 'Usuário ou senha inválidos',
            life: 60000
          });
        }
      },
    });

  }

  /** Métodos auxiliares */

  changeNewUser() {
    this.newUser = !this.newUser;
  }

  private valid(atributo: string | undefined) {
    return atributo === undefined || atributo === null || atributo.length <= 1;
  }

  private validCredencial(): boolean {
    if (this.valid(this.credencial.login) || this.valid(this.credencial.senha)) {
      if (this.valid(this.credencial.login) && this.valid(this.credencial.senha)) {
        this._messageService.add({
          severity: 'warn',
          summary: 'O Usuário e a Senha devem estar preenchidos!',
          life: 60000
        });
        return false;
      } else if (this.valid(this.credencial.login)) {
        this._messageService.add({
          severity: 'warn',
          summary: 'O Usuário é obrigatório!',
          life: 60000
        });
        return false;
      } else if (this.valid(this.credencial.senha)) {
        this._messageService.add({
          severity: 'warn',
          summary: 'A Senha é obrigatória',
          life: 60000
        });
        return false;
      }
    }
    return true;

  }
}
