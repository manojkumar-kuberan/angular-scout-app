import { Component } from '@angular/core';

import { ContactHeader } from '../../components/contact-header/contact-header';
import { ContactMethods } from '../../components/contact-methods/contact-methods';
import { ContactForm } from '../../components/contact-form/contact-form';
import { ContactInformation } from '../../components/contact-information/contact-information';

@Component({
  selector: 'app-contact-page',
  imports: [ContactHeader, ContactMethods, ContactForm, ContactInformation],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
})
export class ContactPage {}
