import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword {

  private fb = inject(FormBuilder);
  private authService = inject(Auth);

  isLoading = false;
  isSubmitted = false;


  forgotPasswordForm = this.fb.group({

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ]

  });


  get email() {
    return this.forgotPasswordForm.controls.email;
  }


  onSubmit() {

    if (this.forgotPasswordForm.invalid) {

      this.forgotPasswordForm.markAllAsTouched();

      return;
    }


    this.isLoading = true;


    console.log(
      this.forgotPasswordForm.value
    );

    this.isLoading = true;

    this.authService.forgotPassword(this.email.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.isSubmitted = true;
      },
      error: () => {
        this.isLoading = false;
      }
    });

    setTimeout(() => {

      this.isLoading = false;

      this.isSubmitted = true;

    }, 1000);

  }

}