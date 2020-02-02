import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from "../../services/noticia.service";



@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html'
})
export class SeccionComponent implements OnInit {

  seccion;

  id;

  noticias: any = [];

  constructor(public activatedRoute:ActivatedRoute,
              public _noticiaService: NoticiaService) {




    this.activatedRoute.params.subscribe( params => {

      this.id = params['id'];
                

      switch(params['id']) {
          case 'Liga':
            this.seccion = 'Liga Española';
          break;
          case 'Premier':
            this.seccion = 'Premier League';
          break;
          case 'Ligue1':
            this.seccion = 'Ligue 1';
          break;
          case 'Bundesliga':
            this.seccion = 'Bundesliga';
          break;
          case 'SerieA':
            this.seccion = 'Serie A';
          break;
          case 'Liber':
            this.seccion = 'Libertadores';
          break;
          case 'Suda':
            this.seccion = 'Sudamericana';
          break;
          case 'Champions':
            this.seccion = 'Champions League';
          break;
          case 'Europa':
            this.seccion = 'Europa League';
          break;



          case 'Boca':
            this.seccion = 'Boca Juniors';
          break;
          case 'River':
            this.seccion = 'River Plate';
          break;
          case 'Milan':
            this.seccion = 'AC Milan';
          break;
          case 'Inter':
            this.seccion = 'Inter';
          break;
          case 'Bayern':
            this.seccion = 'Bayern Munich';
          break;
          case 'United':
            this.seccion = 'Manchester United';
          break;
          case 'Liverpool':
            this.seccion = 'Liverpool';
          break;
          case 'PSG':
            this.seccion = 'PSG';
          break;
          case 'Barcelona':
            this.seccion = 'Barcelona';
          break;
          case 'Real':
            this.seccion = 'Real Madrid';
          break;
      }

      this.noticias = [];

      this._noticiaService.getNoticias()
      .subscribe(data => {
        for (const d of (data as any)) {
  
  
          if(d.seccion == this.id){
  
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
