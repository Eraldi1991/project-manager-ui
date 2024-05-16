import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../models/project.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { switchMap } from 'rxjs';
import { TaskListComponent } from '../../../components/tasks/task-list/task-list.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TaskFormComponent } from '../../../components/tasks/task-form/task-form.component';
import { Nullable } from 'primeng/ts-helpers';
import { Task } from 'zone.js/lib/zone-impl';

@Component({
  selector: 'app-project',
  standalone: true,
  templateUrl: './project.component.html',
  imports: [
    CommonModule,
    TaskListComponent,
    ButtonModule,
    DialogModule,
    TaskFormComponent,
  ],
})
export class ProjectComponent implements OnInit {
  project: Project | null = null;
  loading = false;

  showModal: boolean = false;
  taskToEdit: Nullable<Task>;
  projectId: any;

  openAddTaskDialog() {
    this.showModal = true;
  }

  constructor(
    private _route: ActivatedRoute,
    private _projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this._route.params
      .pipe(
        switchMap((params) => this._projectService.getProject(params['id']))
      )
      .subscribe((project) => {
        this.project = project;
        this.loading = false;
      });
  }
}
