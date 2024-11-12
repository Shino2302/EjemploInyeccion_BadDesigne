import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export default class LoginComponent {
  errorMessage: string = '';
  successMessage: string = '';

  loginForm: FormGroup;

  constructor(private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }
  
  login(){
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.loginService.login(email, password).subscribe(
      (response) => {
        if (response && response.message) {
          this.successMessage = response.message;
          this.loginService.setUser(response.data);
          console.log('Login exitoso', response);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'No se recibió una respuesta esperada del servidor';
        }
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        this.errorMessage = error.error.message || 'Ocurrió un error al iniciar sesión';
      }
    );
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }

}
