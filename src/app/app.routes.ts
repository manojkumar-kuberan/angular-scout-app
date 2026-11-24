import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'nasa-scout',
    pathMatch: 'full',
  },
  {
    path: 'nasa-scout',
    loadComponent: () =>
      import('./features/nasa-scout/pages/nasa-scout-page/nasa-scout-page').then(
        (m) => m.NasaScoutPage,
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/pages/contact-page/contact-page').then((m) => m.ContactPage),
  },
  {
    path: '**',
    redirectTo: 'nasa-scout',
  },
];
