import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import $ from 'jquery';
import { DomSanitizer } from '@angular/platform-browser'
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  session;

  cerrar;

  admin;


  constructor(private http: HttpClient, public router:Router, private sanitized: DomSanitizer, private cdr: ChangeDetectorRef) { }




   getRoute(event) {
    var goRoute = event.target.getAttribute('data-link');
    this.router.navigate([goRoute]);
  }

  ngOnInit() {

                    this.http.get<any>('http://localhost:3000/session').subscribe(data => {


                        this.session = this.sanitized.bypassSecurityTrustHtml(data[0]['h']);

                        this.cerrar = this.sanitized.bypassSecurityTrustHtml(data[0]['c']);

                        this.admin = this.sanitized.bypassSecurityTrustHtml(data[0]['a']);

                })




  }

  buscar(){

    let a = document.getElementById("buscar") as HTMLInputElement ;
    
    
    this.router.navigate(['/buscar', a.value]);
    
  }

}
