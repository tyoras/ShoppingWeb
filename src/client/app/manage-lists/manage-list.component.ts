import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ListService, ItemService, UserService, AlertService, List, Item, User } from '../shared/index';

/**
 * This class represents the lazy loaded ManageListComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sweb-manage-list',
  templateUrl: 'manage-list.component.html',
  styleUrls: ['manage-list.component.css']
})
export class ManageListComponent implements OnInit {

  errorMessage: string;
  loading = false;
  list: List;
  owner: User;
  newItem: any = { quantity : 1 };
  private routeParamSub: any;

  /**
   * Creates an instance of the ManageListComponent with the injected services.
   *
   * @param {ListService} listService - The injected ListService.
   * @param {ItemService} itemService - The injected ItemService.
   * @param {AlertService} alertService - The injected AlertService.
   */
  constructor(private router: Router, private route: ActivatedRoute,
    private listService: ListService, private itemService: ItemService,
    private userService: UserService, private alertService: AlertService) { }

  /**
   * Get the list OnInit
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

  update() {
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

  addItem() {
    this.loading = true;
    this.itemService.create(this.list.id, this.newItem).subscribe(
      createdItem => {
        this.alertService.success(`${this.newItem.name} added successfully`, true);
        this.loading = false;
        this.list.itemList.push(createdItem);
        this.newItem = { quantity : 1 };
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  deleteItem(item: Item) {
    this.loading = true;
    this.itemService.deleteById(this.list.id, item.id).subscribe(
      response => {
        this.alertService.success(`${item.name} deleted successfully`, true);
        let index = this.findItemIndex(item);
        this.list.itemList.splice(index);
        this.loading = false;
        let link = ['/list', this.list.id];
    		this.router.navigate(link);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  gotoItem(item: Item) {
		let link = ['/list', this.list.id, item.id];
		this.router.navigate(link);
	}

  changeState(item: Item) {
    this.itemService.changeItemState(this.list.id, item).subscribe(
      response => this.getList(this.list.id),
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  cancelItem(item: Item) {
    this.itemService.cancelItem(this.list.id, item).subscribe(
      response => this.getList(this.list.id),
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  private findItemIndex(item: Item) {
    return this.list.itemList.indexOf(item);
  }

}
