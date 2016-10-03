import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/index';
import { NavbarComponent } from './navbar/index';
import { AlertComponent, AlertService } from './alert/index';
import { NameListService } from './name-list/index';
import { AuthService, AuthGuard } from './auth/index';
import { RegisterUserService, UserService } from './user/index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ToolbarComponent, NavbarComponent, AlertComponent],
  exports: [ToolbarComponent, NavbarComponent, AlertComponent,
    CommonModule, FormsModule, RouterModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NameListService, AlertService, AuthService, AuthGuard, RegisterUserService, UserService]
    };
  }
}