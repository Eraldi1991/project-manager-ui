import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Nullable } from 'primeng/ts-helpers';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DataViewModule,
    DialogModule,
    TaskFormComponent,
  ],
})
export class TaskListComponent implements OnInit {
  constructor(public taskService: TaskService) {}

  @Input() projectId: number | undefined;

  layout: 'list' | 'grid' = 'grid';
  loading = false;

  taskToEdit: Nullable<Task> = null;
  showModal = false;

  ngOnInit(): void {
    console.log(this.projectId);
    if (this.projectId) {
      this.loading = true;
      this.taskService
        .getTasks(this.projectId)
        .subscribe(() => (this.loading = false));
    }
  }

  editTask(task: Task) {
    this.taskToEdit = task;
    this.showModal = true;
  }

  removeTask(Task: Task) {
    this.taskService.removeTask(Task.id).subscribe();
  }
}
