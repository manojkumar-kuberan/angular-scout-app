import { Component, input, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

import { ScoutCandidate } from '../../models/scout-api-response.model';

@Component({
  selector: 'app-candidate-details-dialog',
  imports: [DialogModule],
  templateUrl: './candidate-details-dialog.html',
  styleUrl: './candidate-details-dialog.scss',
})
export class CandidateDetailsDialog {
  readonly candidate = input<ScoutCandidate | null>(null);
  readonly visible = input(false);
  readonly visibleChange = output<boolean>();
}
