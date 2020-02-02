import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from "../../services/noticia.service";

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html'
})
export class BuscarComponent implements OnInit {


  id;

  noticias: any = [];




  constructor(public activatedRoute:ActivatedRoute,
              public _noticiaService: NoticiaService) {






                this.activatedRoute.params.subscribe( params => {

                  this.id = params['id'];
                            
            
                  this.noticias = [];
            
                  this._noticiaService.getNoticias()
                  .subscribe(data => {
                    for (const d of (data as any)) {

                      

                      var re = new RegExp(this.id, 'i');

                      // d.seccion.match(re);

                      var se = d.seccion;

                      var ti = d.titulo;

                      var su = d.sub;
              
              
                      if(se.match(re) || ti.match(re) || su.match(re)){
              
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
              
              
                    }
              
                    console.log(this.noticias);
              
                    // alert(this.noticias[0]['titulo']);
              
              
              
              
              
              
              
                  });
            
            
                });






               }

  ngOnInit() {


  }

}
