import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from '../../../components/projects/project-list/project-list.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProjectFormComponent } from '../../../components/projects/project-form/project-form.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  imports: [
    CommonModule,
    ProjectListComponent,
    ButtonModule,
    DialogModule,
    ProjectFormComponent,
  ],
})
export class ProjectsComponent {
  showModal = false;
}
