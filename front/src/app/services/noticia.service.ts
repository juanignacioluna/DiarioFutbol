import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable()
export class NoticiaService {
constructor(private _http: HttpClient) { }


getNoticias() {

        return this._http.get("http://localhost:3000/noticia");


 }



}
