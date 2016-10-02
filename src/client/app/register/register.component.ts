import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, RegisterUserService } from '../shared/index';

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html'
})

export class RegisterComponent {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private registerService: RegisterUserService,
    private alertService: AlertService) { }

  register() {
    this.loading = true;
    this.registerService.register(this.model).subscribe(
      user => {
        this.alertService.success(`Registration of user ${user.name} is successful`, true);
        this.router.navigate(['/login']);
      },
      error => {
        //TODO handle 409 conflict status
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }
}
