import { Route } from '@angular/router';
import { ProfileComponent, ProfileUpdateComponent } from './index';
import { AuthGuard } from '../shared/index';

export const ProfileRoutes: Route[] = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/update',
    component: ProfileUpdateComponent,
    canActivate: [AuthGuard]
  }
];
