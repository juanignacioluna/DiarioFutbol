import { Component, OnInit } from '@angular/core';
import { NoticiaService } from "../../services/noticia.service";
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html'
})
export class NuevoComponent implements OnInit {

  myRadio: string = '';

    public uploader: FileUploader = new FileUploader({
    url: "http://localhost:3000/upload",
    itemAlias: 'image'
  });


  constructor(  private http: HttpClient,
                public activatedRoute:ActivatedRoute, public router:Router) {



                }


  agregar(){

    let titulo = document.getElementById("titulo") as HTMLInputElement;


    let select = (<HTMLSelectElement>document.getElementById('select')).value;


    let sub = document.getElementById("sub") as HTMLInputElement;
    let texto = document.getElementById("texto") as HTMLInputElement;
    


    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      // alert('File successfully uploaded!');
      this.http.post<any>('http://localhost:3000/agregar', {  titulo: titulo.value,
                                                              sub: sub.value,
                                                              seccion: select,
                                                              myRadio: this.myRadio,
                                                              texto: texto.value
      }).subscribe(data => {


      this.router.navigate(['/home']);




      })
    };

    this.uploader.uploadAll();

  }





  ngOnInit() {




  }

}
