import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { LoginRoutes } from './login/index';
import { RegisterRoutes } from './register/index';
import { ProfileRoutes } from './profile/index';
import { ManageListsRoutes } from './manage-lists/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...LoginRoutes,
  ...RegisterRoutes,
  ...ProfileRoutes,
  ...ManageListsRoutes,
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
