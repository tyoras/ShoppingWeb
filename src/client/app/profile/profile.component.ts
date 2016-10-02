import { Component, OnInit } from '@angular/core';

import {Md5} from 'ts-md5/dist/md5';

import { UserService, AlertService, User } from '../shared/index';

/**
 * This class represents the lazy loaded ProfileComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sweb-profile',
  templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {

  errorMessage: string;
  user: User;
  gravatarId: Int32Array | string;

  /**
   * Creates an instance of the ProfileComponent with the injected services.
   *
   * @param {UserService} userService - The injected UserService.
   * @param {AlertService} alertService - The injected AlertService.
   */
  constructor(private userService: UserService, private alertService: AlertService) { }

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

  getGravatarId(email: string): Int32Array | string {
    return Md5.hashStr(email);
  }

}
