import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitMessage: string;

  username = new FormControl('');
  password = new FormControl('');

  loginForm = new FormGroup({
    username: this.username, password: this.password
  });
  constructor(private authService: AuthenticationService, private router: RouterService) {

  }
  

  loginSubmit() {

    this.authService.authenticateUser(this.loginForm.value).subscribe(
      res => {
        console.log(res),
        this.authService.setBearerToken(res['token']);
        this.router.routeToDashboard();
      },
      err => {
        if (err.error) {
          this.submitMessage = err.error.message;
        }
        else {
          this.submitMessage = err.message;
        }
      }
    )
  }

}
