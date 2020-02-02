import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SeccionComponent } from './components/seccion/seccion.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CerrarComponent } from './components/cerrar/cerrar.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { BorrarComponent } from './components/borrar/borrar.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'borrar', component: BorrarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nuevo', component: NuevoComponent },
  { path: 'cerrar', component: CerrarComponent },
  { path: 'seccion', component: SeccionComponent },
  { path: 'seccion/:id', component: SeccionComponent },
  { path: 'noticia', component: NoticiaComponent },
  { path: 'noticia/:id', component: NoticiaComponent },
  { path: 'buscar/:id', component: BuscarComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true } );
