import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FileSelectDirective } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';

//Rutas
import { APP_ROUTING } from './app.routes';

//Servicios
import { HomeService } from "./services/home.service";
import { PrincipalService } from "./services/principal.service";
import { NoticiaService } from "./services/noticia.service";

//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SeccionComponent } from './components/seccion/seccion.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CerrarComponent } from './components/cerrar/cerrar.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { BorrarComponent } from './components/borrar/borrar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SeccionComponent,
    NoticiaComponent,
    BuscarComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    CerrarComponent,
    NuevoComponent,
    FileSelectDirective,
    BorrarComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HomeService,
    PrincipalService,
    NoticiaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
