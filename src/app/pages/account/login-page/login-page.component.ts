import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../../../services/data.service';
import { CustomValidator } from '../../../validators/custom.validator';
import { Security } from '../../../utils/security.util';

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
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.required,
          CustomValidator.isCpf(),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required,
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
          this.busy = false;
          this.setUser(data);
        },
        err => {
          this.busy = false;
          Security.clear();
        },
      );
    }
  }

  submit() {
    this.busy = true;
    this.service.authenticate(this.form.value).subscribe(
      (data: any) => {
        this.busy = false;
        this.setUser(data);
      },
      err => {
        this.busy = false;
        Security.clear();
      },
    );
  }

  setUser({ customer, token }) {
    Security.set(customer, token);
    this.router.navigate(['/']);
  }
}
