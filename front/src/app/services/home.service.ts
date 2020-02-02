import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable()
export class HomeService {
constructor(private _http: HttpClient) { }



getNotis() {
 return this._http.get("http://localhost:3000/home");
}



}
