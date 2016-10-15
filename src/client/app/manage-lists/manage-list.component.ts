import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ListService, UserService, AlertService, List, User } from '../shared/index';

/**
 * This class represents the lazy loaded ManageListsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sweb-manage-list',
  templateUrl: 'manage-list.component.html'
})

export class ManageListComponent implements OnInit {

  errorMessage: string;
  loading = false;
  private routeParamSub: any;
  list: List;
  owner: User;

  /**
   * Creates an instance of the ManageListsComponent with the injected services.
   *
   * @param {ListService} listService - The injected ListService.
   * @param {AlertService} alertService - The injected AlertService.
   */
  constructor(private router: Router, private route: ActivatedRoute,
    private listService: ListService, private userService: UserService,
    private alertService: AlertService) { }

  /**
   * Get the user OnInit
   */
  ngOnInit() {
    this.routeParamSub = this.route.params.subscribe(params => {
       let id: string = params['id'];
       this.getList(id);
    });
  }

  getList(listId: string) {
    this.listService.getById(listId)
      .subscribe(
      list => {
        this.list = list;
        this.userService.getById(list.ownerId)
          .subscribe(
            owner => {
              this.owner = owner;
            },
            error => this.errorMessage = <any>error
          );
      },
      error => this.errorMessage = <any>error
      );
  }

  create() {
    this.loading = true;

    this.listService.update(this.list).subscribe(
      response => {
        this.alertService.success(`${this.list.name} updated successfully`, true);
        this.router.navigate(['/lists']);
      },
      error => {
        //TODO handle 409 conflict status
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  deleteList() {
    this.loading = true;
    this.listService.deleteById(this.list.id).subscribe(
      response => {
        this.alertService.success(`${this.list.name} deleted successfully`, true);
        this.router.navigate(['/lists']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

}
