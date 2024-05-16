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
import { Task } from '../../../models/task.model';
import { ValidatedFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    ValidatedFormFieldComponent,
  ],
})
export class TaskFormComponent implements OnInit {
  @Input() task: Nullable<Task> = null;

  @Output() saved = new EventEmitter<Task>();
  @Output() canceled = new EventEmitter();

  private readonly _messageService = inject(MessageService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _taskService = inject(TaskService);

  isSubmitting = false;

  readonly taskForm: FormGroup = this._formBuilder.group({
    title: ['', [Validators.required]],
    description: [''],
  });

  ngOnInit() {
    const task = this.task;
    if (task) {
      this.taskForm.patchValue(task);
    }
  }

  addTask() {
    this.isSubmitting = true;
    this._taskService.addTask({ ...this.taskForm.value }).subscribe((task) => {
      this._messageService.add({
        severity: 'success',
        detail: 'task Created Successfully',
      });
      this.taskForm.reset();
      this.saved.emit(task);
      this.isSubmitting = false;
    });
  }

  updateTask() {
    this.isSubmitting = true;
    this._taskService
      .updateTask({
        ...this.task,
        ...this.taskForm.value,
      })
      .subscribe((task) => {
        this._messageService.add({
          severity: 'success',
          detail: 'task Updated Successfully',
        });
        this.taskForm.reset();
        this.saved.emit(task);
        this.isSubmitting = false;
      });
  }

  submit(): void {
    if (this.task?.id) {
      this.updateTask();
    } else {
      this.addTask();
    }
  }

  cancel() {
    this.taskForm.reset();
    this.canceled.emit();
  }
}
