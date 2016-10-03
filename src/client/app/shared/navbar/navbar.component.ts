import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, AlertService, Helper } from '../index';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sweb-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})

export class NavbarComponent {

  constructor(private authService: AuthService, private alertService: AlertService, private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.alertService.success("Logged out");
  }

  isAuthenticated(): boolean {
    return Helper.isAuthenticated();
  }
}
