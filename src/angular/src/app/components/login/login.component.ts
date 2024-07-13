import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  newUser: boolean = false;
labelButton: string = !this.newUser ? 'Criar conta' : 'Entre na sua conta';

  constructor() {
  }

  ngOnInit(): void {
  }

  changeNewUser() {
    this.newUser = !this.newUser;
  }


}
