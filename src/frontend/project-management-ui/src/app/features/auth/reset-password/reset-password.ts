import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { passwordStrengthValidator }
  from '../../../core/validators/password-strength.validator';

import { confirmPasswordValidator }
  from '../../../core/validators/confirm-password.validator';
import { Auth } from '../../../core/services/auth';
import { Router } from 'express';


@Component({

  selector: 'app-reset-password',

  standalone: true,

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './reset-password.html',

  styleUrl: './reset-password.scss'

})
export class ResetPassword {


  private fb = inject(FormBuilder);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private authService = inject(Auth);



  token = '';

  isLoading = false;



  resetPasswordForm = this.fb.group(

    {

      password: [
        '',
        [
          Validators.required,
          passwordStrengthValidator()
        ]
      ],


      confirmPassword: [
        '',
        Validators.required
      ]


    },
    {
      validators: confirmPasswordValidator()
    }


  );



  ngOnInit() {

    this.token =
      this.route.snapshot.queryParamMap.get('token')
      ?? '';

  }



  get password() {

    return this.resetPasswordForm.controls.password;

  }


  get confirmPassword() {

    return this.resetPasswordForm.controls.confirmPassword;

  }



  onSubmit() {


    if (this.resetPasswordForm.invalid) {

      this.resetPasswordForm.markAllAsTouched();

      return;

    }



    console.log({

      token: this.token,

      ...this.resetPasswordForm.value

    });

    this.isLoading = true;

    this.authService.resetPassword(this.password.value).subscribe({
      next: (response) => {
        console.log('Reset Password Response:', response);
        this.isLoading = false;
        // Navigate to login page or dashboard
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Reset Password Error:', error);
        this.isLoading = false;
      }
    });




  }



}