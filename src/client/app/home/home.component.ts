import { Component, OnInit } from '@angular/core';

import {Md5} from 'ts-md5/dist/md5';

import { NameListService, UserService, AlertService, User } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sweb-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];
  user: User;
  gravatarId: string;

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService: NameListService, private userService: UserService, private alertService: AlertService) { }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getNames();
    this.getUser();
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
    this.nameListService.get()
      .subscribe(
      names => this.names = names,
      error => this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    this.names.push(this.newName);
    this.alertService.error(this.newName);
    this.newName = '';
    return false;
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

  getGravatarId(email: string): string {
    return Md5.hashStr(email);
  }

}
