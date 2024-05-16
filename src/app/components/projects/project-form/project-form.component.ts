import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Nullable } from 'primeng/ts-helpers';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project.service';
import { ValidatedFormFieldComponent } from "../../../shared/components/form-field/form-field.component";

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        ValidatedFormFieldComponent
    ]
})
export class ProjectFormComponent implements OnInit {
  @Input() project: Nullable<Project> = null;

  @Output() saved = new EventEmitter<Project>();
  @Output() canceled = new EventEmitter();

  private readonly _messageService = inject(MessageService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _projectService = inject(ProjectService);

  isSubmitting = false;

  readonly projectForm: FormGroup = this._formBuilder.group({
    title: ['', [Validators.required]],
    description: [''],
  });

  ngOnInit() {
    const project = this.project;
    if (project) {
      this.projectForm.patchValue(project);
    }
  }

  addProject() {
    this.isSubmitting = true;
    this._projectService
      .addProject({ ...this.projectForm.value })
      .subscribe((project) => {
        this._messageService.add({
          severity: 'success',
          detail: 'Project Created Successfully',
        });
        this.projectForm.reset();
        this.saved.emit(project);
        this.isSubmitting = false;
      });
  }

  updateProject() {
    this.isSubmitting = true;
    this._projectService
      .updateProject({
        ...this.project,
        ...this.projectForm.value,
      })
      .subscribe((project) => {
        this._messageService.add({
          severity: 'success',
          detail: 'Project Updated Successfully',
        });
        this.projectForm.reset();
        this.saved.emit(project);
        this.isSubmitting = false;
      });
  }

  submit(): void {
    if (this.project?.id) {
      this.updateProject();
    } else {
      this.addProject();
    }
  }

  cancel() {
    this.projectForm.reset();
    this.canceled.emit();
  }
}
