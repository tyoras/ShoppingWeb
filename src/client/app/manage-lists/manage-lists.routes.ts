import { Route } from '@angular/router';
import { ManageListsComponent, ManageListComponent } from './index';
import { AuthGuard } from '../shared/index';

export const ManageListsRoutes: Route[] = [
  {
    path: 'lists',
    component: ManageListsComponent,
    canActivate: [AuthGuard]
  },
  {
      path: 'list/:id',
      component: ManageListComponent,
      canActivate: [AuthGuard]
  }
];
