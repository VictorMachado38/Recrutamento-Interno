import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-profile',
  templateUrl: './select-profile.component.html',
  styleUrls: ['./select-profile.component.scss']
})
export class SelectProfileComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  goToLoginPage() {
    this._router.navigate(['/login']);
  }
}
