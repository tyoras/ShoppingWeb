import { Component, OnInit } from '@angular/core';

import { AlertService } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sweb-home',
  templateUrl: 'home.component.html',
})

export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];

  /**
   * Creates an instance of the HomeComponent with the injected
   * AlertService.
   *
   * @param {AlertService} alertService - The injected AlertService.
   */
  constructor(private alertService: AlertService) { }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    //this.getConnectedUser();
  }

}
