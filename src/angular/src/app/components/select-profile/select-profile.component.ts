import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-profile',
  templateUrl: './select-profile.component.html',
  styleUrls: ['./select-profile.component.scss']
})
export class SelectProfileComponent implements OnInit {

  /** Construtor */

  constructor(private _router: Router) { }

  /** Atributos */

  /** Métodos herdados */

  ngOnInit(): void {
  }

  /** Métodos de requisição */

  /** Métodos auxiliares */

  goToLoginPage(userType: 'candidate' | 'recruiter') {
    this._router.navigate(['/login', userType]);
  }

}
