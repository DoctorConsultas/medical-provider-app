import { Input, Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  ngForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  @Input() error!: string | null;
  @Output() submitEM = new EventEmitter();

  private readonly hardcodedUsername = 'admin';
  private readonly hardcodedPassword = 'password123';

  constructor(private router: Router) { }
  onSubmit(): void {


    if (this.hardcodedPassword == this.ngForm.get('password')?.value && this.hardcodedUsername == this.ngForm.get('username')?.value) {
      this.router.navigate(['/prescriptions']);
      
    } else {
      this.error = 'Error Credenciales!!!';
    }
    
  }


}
