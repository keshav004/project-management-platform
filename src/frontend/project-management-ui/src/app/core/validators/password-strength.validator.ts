import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const password = control.value as string;

    if (!password) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(password);

    const hasLowerCase = /[a-z]/.test(password);

    const hasNumber = /\d/.test(password);

    const hasSpecialCharacter =
      /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const hasMinimumLength = password.length >= 8;

    const isValid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialCharacter &&
      hasMinimumLength;

    return isValid
      ? null
      : {
          passwordStrength: {
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSpecialCharacter,
            hasMinimumLength
          }
        };
  };

}