import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent implements OnInit {
  
  userData: any = {};
  keyOrder: string[] = ['id', 'firstName', 'lastName','email', 'role'];
  results: any;

  constructor(private login:LoginService, private users: UsersService) {}
  
  ngOnInit(): void {
    this.login.getUser().subscribe(data => {
      if (data) {
        this.userData = data;
      } else {
        console.log('No user data available.');
      }
    });
    this.getAllUsers();
  }
  getOrderedData() {
    // Primero, obtenemos las claves de 'userData' en el orden de 'keyOrder'
    return this.keyOrder.map(key => ({
      key: key,
      value: this.userData[key]
    }));
  }

  getAllUsers() {
    this.users.getAllUsers().subscribe((response: any) => {
      this.results = response;
    });
  }

}
