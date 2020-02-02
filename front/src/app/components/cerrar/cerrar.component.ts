import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cerrar',
  templateUrl: './cerrar.component.html'
})
export class CerrarComponent implements OnInit {


  constructor(public router:Router,private http: HttpClient) { }

  ngOnInit() {


    this.http.post<any>('http://localhost:3000/cerrar', { a: ""}).subscribe(data => {


        this.router.navigate(['/home']);

        console.log(data[0]['u']);




    })


  }

}
