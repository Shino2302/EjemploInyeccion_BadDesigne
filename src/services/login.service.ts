import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, concat, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiRoute:string = "users/login";

  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) { }

  public login(email: string, password:string): Observable<any>{
    
    const route = environment.api + this.apiRoute;

    return this.httpClient.post<any>(route, {email, password} );
  }

  setUser(user: any) {
    this.userSubject.next(user); // Emite los datos del usuario a los suscriptores
  }

  getUser() {
    return this.userSubject.asObservable(); // Retorna un Observable
  }

}
