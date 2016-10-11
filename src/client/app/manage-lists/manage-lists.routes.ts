import { Route } from '@angular/router';
import { ManageListsComponent } from './index';
import { AuthGuard } from '../shared/index';

export const ManageListsRoutes: Route[] = [
  {
    path: 'lists',
    component: ManageListsComponent,
    canActivate: [AuthGuard]
  }
];
