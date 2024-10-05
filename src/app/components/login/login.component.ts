import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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


  constructor(private authService: AuthService, private router: Router) { }

  get usernameControl() {
    return this.ngForm.get('username')!;
  }

  get passwordControl() {
    return this.ngForm.get('password')!;
  }

  onSubmit(): void {
    this.authService.login(this.ngForm.get('username')?.value, this.ngForm.get('password')?.value).subscribe(
      (response) => {
        this.router.navigate(['/prescriptions']);  // Redirect to home after successful login
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
