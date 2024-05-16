import { Component, Input, computed, inject } from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ValidatedFormFieldComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() inputId = '';
  @Input() controlName = '';
  @Input() validations: { parameter: string; message: string }[] = [];
  @Input() styleClass = '';
  @Input() validationIconStyleClass = '';

  private readonly _controlContainer = inject(ControlContainer, {
    optional: true,
  });

  get formControl() {
    return this._controlContainer?.control?.get(
      this.controlName
    ) as FormControl;
  }

  get errors() {
    return this.validations.length > 0 &&
      (this.formControl.touched || this.formControl.dirty) &&
      this.formControl.invalid &&
      this.formControl.errors
      ? this.formControl.errors
      : null;
  }
}
