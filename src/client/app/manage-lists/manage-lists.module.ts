import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ManageListsComponent } from './manage-lists.component';


@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ManageListsComponent],
  exports: [ManageListsComponent]
})
export class ManageListsModule { }
