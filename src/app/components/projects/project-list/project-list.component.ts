import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../services/project.service';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Nullable } from 'primeng/ts-helpers';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.component.html',
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DataViewModule,
    DialogModule,
    ProjectFormComponent,
  ],
})
export class ProjectListComponent implements OnInit {
  constructor(public projectService: ProjectService) {}

  layout: 'list' | 'grid' = 'grid';
  loading = false;

  projectToEdit: Nullable<Project> = null;
  showModal = false;

  ngOnInit(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe(() => (this.loading = false));
  }

  editProject(project: Project) {
    this.projectToEdit = project;
    this.showModal = true;
  }

  removeProject(Project: Project) {
    this.projectService.removeProject(Project.id).subscribe();
  }
}
