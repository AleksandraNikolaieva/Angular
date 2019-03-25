import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../models';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private regForm: FormGroup;
  private isMailFree: boolean = true;
  private error: string;

  constructor(private authServise: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.formInit();
  }

  private formInit() {
    this.regForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.minLength(3), Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]],
      login: [null, [Validators.required, Validators.minLength(3)]],
      firstName: [null],
      lastName: [null],
      bio: [null],
      location: [null],
      photo: [null]
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
    .subscribe(
      res => {
        if(res.length === 0) {
          this.authServise.addLogin(values.email, values.password)
          .subscribe(
            res => {
              if(res) {
                const newUser = new User(
                  values.login,
                  values.firstName,
                  values.lastName,
                  values.bio,
                  values.location,
                  values.photo ? values.photo : undefined
                );
                this.userService.addUser(newUser).subscribe(
                  res => this.router.navigate(['/photos']),
                  error => this.error = error 
                );
              }
            },
            error => this.error = error
          )
        } else {
          this.isMailFree = false;
        }
      },
      error => this.error = error
    );
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.regForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
}
