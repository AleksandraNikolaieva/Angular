import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private logInForm: FormGroup;
  private isLoginExist: boolean = true;

  constructor(private authServise: AuthService,
    private formBuilder: FormBuilder,
    private route: Router) { }

  ngOnInit() {
    this.formInit();
    this.checkLocalStorage();
  }

  private checkLocalStorage() {
    const local = JSON.parse(localStorage.getItem('login'));
    if(local != undefined) {
      this.authServise.logIn(local.email, local.password)
      .subscribe(res => {
        if(res) {
          this.route.navigate(['/photos']);
        }
      })
    }
  }

  private formInit() {
    this.logInForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.minLength(3), Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    })
  }

  private logIn() {
    const controls = this.logInForm.controls;

    if (this.logInForm.invalid) {
      Object.keys(controls)
      .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    const values = this.logInForm.value;
    this.authServise.logIn(values.email, values.password)
    .subscribe(res => {
      if(!res) {
        this.isLoginExist = false;
      } else {
        this.route.navigate(['/photos']);
      }
    });
  }
  
  isControlInvalid(controlName: string): boolean {
    const control = this.logInForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
}
