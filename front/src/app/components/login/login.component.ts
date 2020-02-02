import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, public router:Router) {



    



   }

  ngOnInit() {
  }


  login(){


    let usuario = document.getElementById("usuario") as HTMLInputElement ;

    let password = document.getElementById("password") as HTMLInputElement ;

    // alert(nombre.value);
    


    this.http.post<any>('http://localhost:3000/login', { usuario: usuario.value,
                                                            password: password.value
   }).subscribe(data => {


        // alert(data[0]['u']);

        
        // console.log(data[0]['n']);

        this.router.navigate(['/home']);




    })
    

  }


}
