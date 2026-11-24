import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-candidate-toolbar',
  templateUrl: './candidate-toolbar.html',
  styleUrl: './candidate-toolbar.scss',
})
export class CandidateToolbar {
  readonly searchText = input('');
  readonly candidateSelected = input(false);

  readonly searchTextChange = output<string>();
  readonly viewDetails = output<void>();
}
