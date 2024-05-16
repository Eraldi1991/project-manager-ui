import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';

export const PROJECTS_ROUTES: Routes = [
  {
    path: '',
    component: ProjectsComponent,
  },
  {
    path: ':id', //Here should be set the Project Detail Componet
    component: ProjectComponent,
  },
];
