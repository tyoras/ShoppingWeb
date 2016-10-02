import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AuthService } from '../shared/index';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authService.logout();
  }

  login() {
    this.loading = true;
    this.authService.loginPasswordFlow(this.model.username, this.model.password)
      .subscribe(
      data => {
        this.router.navigate(['/']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

}
