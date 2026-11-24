import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonDirective } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

import { ContactStore } from '../../store/contact.store';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, InputTextModule, TextareaModule, CheckboxModule, ButtonDirective],
  providers: [ContactStore],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private readonly formBuilder = inject(FormBuilder);

  readonly contactStore = inject(ContactStore);

  readonly contactForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    message: ['', Validators.required],
    termsAccepted: [false, Validators.requiredTrue],
  });

  // Reset the form after a successful submission.
  readonly resetFormOnSuccess = effect(() => {
    if (this.contactStore.submissionStatus() === 'success') {
      this.contactForm.reset();
    }
  });

  submitForm(): void {
    if (this.contactStore.isSubmitting()) {
      return;
    }

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.contactStore.submitMessage(navigator.onLine);
  }
}
