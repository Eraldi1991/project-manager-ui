import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../../../components/tasks/task-list/task-list.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TaskFormComponent } from '../../../components/tasks/task-form/task-form.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [
    CommonModule,
    TaskListComponent,
    ButtonModule,
    DialogModule,
    TaskFormComponent,
  ],
})
export class TasksComponent {
  showModal = false;
}
