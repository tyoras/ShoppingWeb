import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ManageListsComponent } from './manage-lists.component';
import { ManageListComponent } from './manage-list.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ManageListsComponent, ManageListComponent],
  exports: [ManageListsComponent, ManageListComponent]
})
export class ManageListsModule { }
