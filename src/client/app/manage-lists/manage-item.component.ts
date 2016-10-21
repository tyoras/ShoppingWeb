import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ListService, ItemService, UserService, AlertService, List, Item, User } from '../shared/index';

/**
 * This class represents the lazy loaded ManageItemComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sweb-manage-item',
  templateUrl: 'manage-item.component.html'
})
export class ManageItemComponent implements OnInit {

  errorMessage: string;
  loading = false;
  item: Item;
  private routeParamSub: any;
  private listId: string;

  /**
   * Creates an instance of the ManageItemComponent with the injected services.
   *
   * @param {ItemService} itemService - The injected ItemService.
   * @param {AlertService} alertService - The injected AlertService.
   */
  constructor(private router: Router, private route: ActivatedRoute,
    private itemService: ItemService,   private userService: UserService,
    private alertService: AlertService) { }

  /**
   * Get the list OnInit
   */
  ngOnInit() {
    this.routeParamSub = this.route.params.subscribe(params => {
       this.listId = params['listId'];
       let itemId: string = params['itemId'];
       this.getItem(itemId);
    });
  }

  getItem(itemId: string) {
    this.itemService.getById(this.listId, itemId)
      .subscribe(
      item => {
        this.item = item;
      },
      error => this.errorMessage = <any>error
      );
  }

  update() {
    this.loading = true;

    this.itemService.update(this.listId, this.item).subscribe(
      response => {
        this.alertService.success(`${this.item.name} updated successfully`, true);
        this.router.navigate(['/list', this.listId]);
      },
      error => {
        //TODO handle 409 conflict status
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  deleteItem() {
    this.loading = true;
    this.itemService.deleteById(this.listId, this.item.id).subscribe(
      response => {
        this.alertService.success(`${this.item.name} deleted successfully`, true);
        this.loading = false;
        let link = ['/list', this.listId];
    		this.router.navigate(link);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  gotoList() {
		let link = ['/list', this.listId];
		this.router.navigate(link);
	}
}
