import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  ngForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  @Input() error: string | null = null;
  @Output() submitEM = new EventEmitter();

  private readonly hardcodedUsername = 'admin';
  private readonly hardcodedPassword = 'password';

  constructor(private router: Router) { }

  get usernameControl() {
    return this.ngForm.get('username')!;
  }

  get passwordControl() {
    return this.ngForm.get('password')!;
  }

  onSubmit(): void {
    if (this.ngForm.invalid) {
      this.ngForm.markAllAsTouched(); // Mark all fields as touched to trigger validation
      return;
    }

    if (this.hardcodedPassword === this.passwordControl.value && this.hardcodedUsername === this.usernameControl.value) {
      this.router.navigate(['/prescriptions']);
    } else {
      this.error = 'Error Credenciales!!!';
    }
  }
}
