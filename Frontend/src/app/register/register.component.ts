import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    name_user: '',
    lastname: '', 
    document_type: '', 
    number_document: '', 
    email: '', 
    password: ''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { name_user, lastname, document_type, number_document, email, password } = this.form;

    // Validación para asegurarse de que no hay campos vacíos
    if (!name_user || !lastname || !document_type || !number_document || !email || !password) {
      this.errorMessage = 'Todos los campos son obligatorios';
      this.isSignUpFailed = true;
      return;
    }

    this.authService.register(name_user, lastname, document_type, number_document, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
