import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Md5} from 'ts-md5/dist/md5';

import { UserService, AlertService, User } from '../shared/index';

/**
 * This class represents the lazy loaded ProfileUpdateComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sweb-profile-update',
  templateUrl: 'profile-update.component.html'
})
export class ProfileUpdateComponent implements OnInit {

  errorMessage: string;
  user: User;
  passwords: string[] = [null, null];
  gravatarId: Int32Array | string;
  loading = false;

  /**
   * Creates an instance of the ProfileUpdateComponent with the injected services.
   *
   * @param {UserService} userService - The injected UserService.
   * @param {AlertService} alertService - The injected AlertService.
   */
  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService) { }

  /**
   * Get the user OnInit
   */
  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getConnectedUser()
      .subscribe(
      user => {
        this.user = user;
        this.gravatarId = this.getGravatarId(user.email);
      },
      error => this.errorMessage = <any>error
      );
  }

  update() {
    this.loading = true;

    this.userService.update(this.user).subscribe(
      response => {
        this.alertService.success(`User ${this.user.name} profile updated successfully`, true);
        this.router.navigate(['/profile']);
      },
      error => {
        //TODO handle 409 conflict status
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  changePassword() {
    this.loading = true;
    let newPassword = this.passwords[0];

    if (newPassword === this.passwords[1]) {
      this.userService.changePassword(this.user.id, this.passwords[0]).subscribe(
        response => {
          this.alertService.success(`User ${this.user.name} password changed successfully`, true);
          this.router.navigate(['/profile']);
        },
        error => {
          //TODO handle 409 conflict status
          this.alertService.error(error);
          this.loading = false;
        }
      );
    } else {
      this.alertService.error("Please type the new password twice.");
      this.loading = false;
    }
  }

  private getGravatarId(email: string): Int32Array | string {
    return Md5.hashStr(email);
  }

}
