import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styles: ``
})
export default class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = "";

  constructor(private router: Router, private userService: UsersService) 
  {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl('')
    })
  }

  register(){
    const firstName = this.registerForm.get('firstName')?.value;
    const lastName = this.registerForm.get('lastName')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const role = this.registerForm.get('role')?.value;
    this.userService.userRegister(firstName, lastName, email, password, role)
    .subscribe((response) => {
      if (response) {
        console.log('Registro exitoso', response);
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'No se recibió una respuesta esperada del servidor';
      }
    },
    (error) => {
      console.error('Error al crear la cuenta', error);
      this.errorMessage = error.error.message || 'Ocurrió un error al crear la cuenta';
    });
  }

  goToLogin(){
    this.router.navigate(['/register']);
  }
}
