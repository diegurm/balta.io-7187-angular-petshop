import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../../validators/custom.validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  public busy = false;

  constructor(
    private readonly service: DataService,
    private readonly fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.required,
          CustomValidator.isCpf()
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required,
          CustomValidator.EmailValidator
        ]),
      ],
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('petshop.token');
    if (token) {
      this.busy = true;
      this.service.refreshToken().subscribe(
        (data: any) => {
          localStorage.setItem('petshop.token', data.token);
          this.busy = false;
        },
        err => {
          console.log(err);
          this.busy = false;
        },
      );
    }
  }

  submit() {
    this.busy = true;
    this.service.authenticate(this.form.value).subscribe(
      (data: any) => {
        localStorage.setItem('petshop.token', data.token);
        this.busy = false;
      },
      err => {
        console.log(err);
        this.busy = false;
      },
    );
  }
}
