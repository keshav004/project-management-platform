import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {confirmPasswordValidator} from '../../../core/validators/confirm-password.validator';
import {passwordStrengthValidator} from '../../../core/validators/password-strength.validator';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(Auth);

  isLoading = false;

  isPasswordVisible = false;

  registerForm = this.fb.nonNullable.group({

    firstName: ['', Validators.required],

    lastName: ['', Validators.required],

    email: ['', [Validators.required, Validators.email]],

    password: ['', [Validators.required, passwordStrengthValidator()]],

    confirmPassword: ['', Validators.required]

  },
  {
    validators: confirmPasswordValidator()
  }
);

  get firstName() {
    return this.registerForm.controls.firstName;
  }

  get lastName() {
    return this.registerForm.controls.lastName;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get confirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;
    }

    console.log(this.registerForm.value);

    const registerRequest = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
    };

    this.isLoading = true;

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        console.log('Register Response:', response);
        this.isLoading = false;
        // Navigate to login page or dashboard
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Register Error:', error);
        this.isLoading = false;
      }
    });

  }

}