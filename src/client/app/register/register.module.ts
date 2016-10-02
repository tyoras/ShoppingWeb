import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register.component';
import { RegisterUserService, AlertService } from '../shared/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  providers: [RegisterUserService, AlertService]
})
export class RegisterModule { }
