import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './task/task.component';

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
  {
    path: ':id', //Here should be set the Project Detail Componet
    component: TaskComponent,
  },
];
