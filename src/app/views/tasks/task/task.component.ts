import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  imports: [CommonModule],
})
export class TaskComponent implements OnInit {
  task: Task | null = null;
  loading = false;

  constructor(
    private _route: ActivatedRoute,
    private _taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this._route.params
      .pipe(switchMap((params) => this._taskService.getTask(params['id'])))
      .subscribe((task) => {
        this.task = task;
        this.loading = false;
      });
  }
}
