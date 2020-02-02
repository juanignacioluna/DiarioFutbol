import { Component, OnInit } from '@angular/core';
import { HomeService } from "../../services/home.service";
import { PrincipalService } from "../../services/principal.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  notis;

  principal;

  constructor(public _HomeService: HomeService,
              public _PrincipalService: PrincipalService,
              public router:Router) { }

  ngOnInit() {

    this.notis = this._HomeService.getNotis();

    console.log(this.notis);

    this.principal = this._PrincipalService.getPrincipal();

    console.log(this.principal);

  }

}
