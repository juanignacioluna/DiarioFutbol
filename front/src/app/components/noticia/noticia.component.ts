import { Component, OnInit } from '@angular/core';
import { NoticiaService } from "../../services/noticia.service";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import $ from 'jquery';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html'
})
export class NoticiaComponent implements OnInit {

  myRadio2: string = '';

  noticias: any = [];

  id;

  titulo;

  sub;

  img;

  seccion;

  texto;


  editar;

  borrar;

  imgInput;


  imgBool;



  public uploader: FileUploader = new FileUploader({
    url: "http://localhost:3000/upload",
    itemAlias: 'image'
  });



  constructor(  public _noticiaService: NoticiaService,
                public activatedRoute:ActivatedRoute, public router:Router, private http: HttpClient, private sanitized: DomSanitizer) {

                this.activatedRoute.params.subscribe( params => {
                

                    this.id = params['id'];

                    this.http.post<any>('http://localhost:3000/ultimaNoti', { ultimaNoti: this.id
                    }).subscribe(data => {

                    })


                });


                  this._noticiaService.getNoticias()
                    .subscribe(data => {
                      for (const d of (data as any)) {


                        if(d._id == this.id){

                          this.titulo = d.titulo;

                          this.sub = d.sub;

                          this.img = d.img;

                          this.seccion = d.seccion;

                          this.texto = d.texto;

                        }

                        this.noticias.push({

                          _id: d._id,

                          titulo: d.titulo,
          
                          sub: d.sub,
          
                          img: d.img,
          
                          seccion: d.seccion,
          
                          texto: d.texto,
          
                          principal: d.principal,
          
                          home: d.home


                        });


                      }

                      console.log(this.noticias);


                    });



                }

  getRoute(event) {
    var goRoute = event.target.getAttribute('data-link');
    this.router.navigate([goRoute]);
  }         
  
  
  editar3() {



    $(document).ready(function() {


      var titulo = $("#titulo").text().replace(/'/g, '"');

      var seccion = $("#seccion").text();

      var sub = $("#sub").text();

      var texto = $("#texto").text();


      $("#titulo").after($("<input id='iTi' class='form-control-lg form-control' type='text' value='"+titulo+"'></input>"));

      $("#titulo").hide();



      $("#seccion").after($("<input id='iSe' class=' form-control' type='text' value='"+seccion+"'></input>"));

      $("#seccion").hide();



      $("#sub").after($("<input id='iSu' class=' form-control' type='text' value='"+sub+"'></input>"));

      $("#sub").hide();

      $("#coso").hide();



      $("#texto").after($('<br><textarea id="iTe" class="form-control" rows="12">'+texto+'</textarea>'));

      $("#texto").hide();




      $("#divGuardar").append($('<button class="btn btn-success" id="guardar">Guardar Cambios</button>'));

      $("#editarr").hide();

      


      $("#tipoNoti").show();

      $("#editarImgBtn").show();








  });


  }



  editarImgBtn(){


    $(document).ready(function() {


      $("#editarImgBtn").hide();


      $("#cargarFoto").attr("type", "file");


    });


    this.imgBool = true;




  }

  
  
  guardar(){


    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      // alert('File successfully uploaded!');
      this.http.post<any>('http://localhost:3000/editar', { id: this.id.toString(),
                                                            seccion: (<HTMLInputElement>document.getElementById("iSe")).value, 
                                                            titulo: (<HTMLInputElement>document.getElementById("iTi")).value,
                                                            sub: (<HTMLInputElement>document.getElementById("iSu")).value,
                                                            texto: (<HTMLInputElement>document.getElementById("iTe")).value,
                                                            myRadio: this.myRadio2,
                                                            imgBool: this.imgBool
                  }).subscribe(data => {

                  this.router.navigate(['/home']);

                  })
    };

    this.uploader.uploadAll();

    if(this.uploader['isUploading']==false){
      

          this.http.post<any>('http://localhost:3000/editar', { id: this.id.toString(),
                                                                seccion: (<HTMLInputElement>document.getElementById("iSe")).value, 
                                                                titulo: (<HTMLInputElement>document.getElementById("iTi")).value,
                                                                sub: (<HTMLInputElement>document.getElementById("iSu")).value,
                                                                texto: (<HTMLInputElement>document.getElementById("iTe")).value,
                                                                myRadio: this.myRadio2,
                                                                imgBool: this.imgBool
          }).subscribe(data => {

          this.router.navigate(['/home']);

          })
    }
    

  }


  ngOnInit() {


    this.imgBool = false;



    $(document).ready(function() {


      $("#tipoNoti").hide();

      $("#editarImgBtn").hide();


    });

    this.http.get<any>('http://localhost:3000/session').subscribe(data => {


      this.editar = this.sanitized.bypassSecurityTrustHtml(data[0]['e']);

      this.borrar = this.sanitized.bypassSecurityTrustHtml(data[0]['b']);

      this.imgInput = this.sanitized.bypassSecurityTrustHtml(data[0]['imgInput']);


    })






  }

}
