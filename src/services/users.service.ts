import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiRoute:string = "users";

  constructor(private httpClient: HttpClient) { }

  public userRegister(firstName: string, lastName: string ,email: string, password:string, role:string): Observable<any>{
    
    const route = environment.api + this.apiRoute;

    return this.httpClient.post<any>(route, {firstName, lastName,email, password, role} );
  }

  public getAllUsers(): Observable<any> {
    const route = environment.api + this.apiRoute;
    return this.httpClient.get<any>(route, {} );
  }

}
