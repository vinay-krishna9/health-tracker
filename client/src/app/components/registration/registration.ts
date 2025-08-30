import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth-service';
import { RegistrationRequest, User } from '../../models/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.html',
  styleUrl: './registration.scss',
})
export class Registration {
  private fb = inject(FormBuilder);
  private _auth = inject(AuthService);
  private router = inject(Router);

  errorMessage!: string;

  registrationForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ],
    ],
  });

  onSubmit() {
    const registration: RegistrationRequest = {
      name: this.registrationForm.value.name!,
      email: this.registrationForm.value.email!,
      password: this.registrationForm.value.password!,
    };

    this._auth.registration(registration).subscribe(
      (response) => {
        localStorage.setItem('token', btoa(response.token));
        this.registrationForm.reset();
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }
}
