import { Component, inject, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-custom-validate-message',
  standalone: true,
  imports: [MatError],
  templateUrl: './custom-validate-message.component.html',
  styleUrl: './custom-validate-message.component.scss',
})
export class CustomValidateMessageComponent {
  @Input({ required: true }) controlName!: string;
  @Input({ required: false }) minLength!: string;
  @Input({ required: false }) maxLength!: string;

  private controlContainer = inject(ControlContainer);

  get form(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  get control(): FormControl {
    return this.form.get(this.controlName) as FormControl;
  }
}
