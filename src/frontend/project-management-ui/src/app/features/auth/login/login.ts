import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  //constructor(private readonly fb: FormBuilder) {}

  private readonly formBuilder = inject(FormBuilder);

  private readonly authService = inject(Auth);
  
  private readonly router = inject(Router);

  isPasswordVisible = false;
  isLoading = false;

  loginForm = this.formBuilder.nonNullable.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],

    rememberMe: [false]
  });

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const loginRequest = this.loginForm.getRawValue();

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        console.log('Login Response:', response);
        
        this.isLoading = false;
        this.router.navigate(['/dashboard']); // Navigate to the dashboard after successful login
      },
      error: (error) => {
        console.error('Login Error:', error);
        this.isLoading = false;
        // Handle login error (e.g., display error message)
      }
    });

    console.log('Login Request:', loginRequest);

    // API integration will be added later
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
