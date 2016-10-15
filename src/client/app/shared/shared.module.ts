import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/index';
import { AlertComponent, AlertService } from './alert/index';
import { AuthService, AuthGuard } from './auth/index';
import { RegisterUserService, UserService } from './user/index';
import { ListService } from './list/index';
import { ItemService } from './list/index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NavbarComponent, AlertComponent],
  exports: [NavbarComponent, AlertComponent,
    CommonModule, FormsModule, RouterModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AlertService, AuthService, AuthGuard,
                  RegisterUserService, UserService, ListService, ItemService]
    };
  }
}
