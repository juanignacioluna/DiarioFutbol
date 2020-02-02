import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private http: HttpClient, public router:Router) { }

  ngOnInit() {
  }



  registro(){


    let nombre = document.getElementById("nombre") as HTMLInputElement ;

    let usuario = document.getElementById("usuario") as HTMLInputElement ;

    let password = document.getElementById("password") as HTMLInputElement ;

    // alert(nombre.value);
    


    this.http.post<any>('http://localhost:3000/registro', { nombre: nombre.value,
                                                            usuario: usuario.value,
                                                            password: password.value
   }).subscribe(data => {


        // alert(data[0]['u']);

        
        // console.log(data[0]['n']);

        this.router.navigate(['/home']);




    })
    

  }



}
