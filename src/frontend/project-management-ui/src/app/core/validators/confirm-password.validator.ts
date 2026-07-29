import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export function confirmPasswordValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const password = control.get('password');

    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) {
      return null;
    }

    if (password.value !== confirmPassword.value) {

      confirmPassword.setErrors({
        passwordMismatch: true
      });

    } else {

      confirmPassword.setErrors(null);

    }

    return null;
  };

}