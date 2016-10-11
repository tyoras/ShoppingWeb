import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ListService, AlertService, List } from '../shared/index';

/**
 * This class represents the lazy loaded ManageListsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sweb-manage-lists',
  templateUrl: 'manage-lists.component.html'
})

export class ManageListsComponent implements OnInit {

  errorMessage: string;
  loading = false;
  lists: List[] = [];

  /**
   * Creates an instance of the ManageListsComponent with the injected services.
   *
   * @param {ListService} listService - The injected ListService.
   * @param {AlertService} alertService - The injected AlertService.
   */
  constructor(private router: Router,private listService: ListService, private alertService: AlertService) { }

  /**
   * Get the user OnInit
   */
  ngOnInit() {
    this.getUserLists();
  }

  getUserLists() {
    this.listService.getLists()
      .subscribe(
      lists => {
        this.lists = lists;
      },
      error => this.errorMessage = <any>error
      );
  }

  deleteList(list: List) {
    this.loading = true;
    this.listService.deleteById(list.id).subscribe(
      response => {
        this.alertService.success(`${list.name} deleted successfully`, true);
        this.router.navigate(['/lists']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  gotoList(list: List) {
    //TODO: finish detail
		let link = ['lists/detail', { id: list.id }];
		this.router.navigate(link);
	}

}
