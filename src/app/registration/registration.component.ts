import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Login } from '../models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private regForm: FormGroup;
  private isMailFree: boolean = true;

  constructor(private authServise: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formInit();
  }

  private formInit() {
    this.regForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.minLength(3), Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    })
  }

  private registrate() {
    const controls = this.regForm.controls;

    if (this.regForm.invalid) {
      Object.keys(controls)
      .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    const values = this.regForm.value;

    this.authServise.isMailExist(values.email)
    .subscribe(res => {
      console.log(res);
      if(res.length === 0) {
        this.authServise.addLogin(values.email, values.password)
        .subscribe(res => {
          if(res) {
            this.router.navigate(['/photos']);
          }
        })
      } else {
        this.isMailFree = false;
      }
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.regForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
}
