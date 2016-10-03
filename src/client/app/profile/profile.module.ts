import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProfileUpdateComponent } from './profile-update.component';


@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ProfileComponent, ProfileUpdateComponent],
  exports: [ProfileComponent]
})
export class ProfileModule { }
