import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import * as CryptoJS from 'crypto-js';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MessagesModule} from 'primeng/messages';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  ngForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  @Input() error: string | null = null;
  @Output() submitEM = new EventEmitter();


  constructor(private authService: AuthService, 
    private router: Router,
    private _snackBar: MatSnackBar) { }

  get usernameControl() {
    return this.ngForm.get('username')!;
  }

  get passwordControl() {
    return this.ngForm.get('password')!;
  }

  onSubmit(): void {
    const dynamicInfo = this.generateDynamicInfo();  // Generate dynamicInfo
    const encryptedPassword = this.encryptPassword(this.ngForm.get('password')?.value, dynamicInfo);

    // Call the login service with the encrypted password and dynamicInfo
    this.authService.login(this.ngForm.get('username')?.value, encryptedPassword, dynamicInfo).subscribe(
      (response) => {
        console.log(response)
        this.router.navigate(['/prescriptions']);  // Redirect to home after successful login
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        let errorMessage = 'An error occurred. Please contact technical support.';
  
        // Check the error response and set the message accordingly
        if (error.error && typeof error.error.message === 'string') {
          if (error.error.message.includes('User not found')) {
            errorMessage = 'The username is incorrect. Please try again.';
          } else if (error.error.message.includes('Credencial')) {
            errorMessage = 'The password is incorrect. Please try again.';
          } else {
            errorMessage = "Hay un error, por favor contacte con el área técnica"; // Use the error message from the server
          }
        }
  {}
        this.openSnackBar(errorMessage, 'error');
        console.error('Login failed', error);
      }
    );
  }

  // Function to generate the dynamicInfo (first 10 characters of a GUID)
  generateDynamicInfo(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }).slice(0, 10); // Return first 10 characters
  }

  // Function to ensure the key is 32 bytes (padding or truncating if needed)
  padOrTruncateKey(key: string): string {
    const maxLength = 32; // AES key must be 16, 24, or 32 bytes
    if (key.length > maxLength) {
      return key.slice(0, maxLength);  // Truncate if too long
    } else {
      return key.padEnd(maxLength, '0');  // Pad with '0' if too short
    }
  }

  encryptPassword(password: string, dynamicInfo: string): string {
    const commonKey = 'ahjsdfhjbqer56243';  // Your common decryption key
    let finalKey = commonKey + dynamicInfo;
    console.log(finalKey);
    // Ensure finalKey is exactly 32 bytes long
    finalKey = this.padOrTruncateKey(finalKey);

    // Encrypt the password using AES
    const encrypted = CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse(finalKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString();

    return encrypted;
  }

  openSnackBar(message: string, type: string) { 
    this._snackBar.open(message, 'X', {
      duration: 3000
    });
  }

}
