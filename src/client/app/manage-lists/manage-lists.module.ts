import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ManageListsComponent } from './manage-lists.component';
import { ManageListComponent } from './manage-list.component';
import { ManageItemComponent } from './manage-item.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ManageListsComponent, ManageListComponent, ManageItemComponent],
  exports: [ManageListsComponent, ManageListComponent, ManageItemComponent]
})
export class ManageListsModule { }
