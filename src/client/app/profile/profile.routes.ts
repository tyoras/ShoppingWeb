import { Route } from '@angular/router';
import { ProfileComponent } from './index';
import { AuthGuard } from '../shared/index';

export const ProfileRoutes: Route[] = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];
