import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { AuthGuard } from './infra';
import { Roles } from './models/role';
import { AuthLayoutComponent } from './containers/auth-layout/auth-layout.component';
import { TncComponent } from './views/tnc/tnc.component';
import { PrivacyComponent } from './views/privacy/privacy.component';
import { PaymentCallbackComponent } from './payment-callback/payment-callback.component';
// import { HomeTopBarComponent } from './shared/components/home-top-bar/home-top-bar.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'terms_of_service',
    children: [
      {
        path: '',
        component: TncComponent
      }
    ],
  },
  {
    path: 'privacy_policy',
    children: [
      {
        path: '',
        component: PrivacyComponent
      }
    ],
  },
  {
    path: 'payment/callback',
    children: [
      {
        path: '',
        component: PaymentCallbackComponent
      }
    ],
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
      //   canActivate: [AuthGuard],
      //   data: {
      //     roles: [Roles.Admin, Roles.TL, Roles.BD]
      //   }
      // },
    ]
  },
  // { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
