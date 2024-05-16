import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/projects/projects.routes').then(
            (m) => m.PROJECTS_ROUTES
          ),
      },
    ],
  },
];
