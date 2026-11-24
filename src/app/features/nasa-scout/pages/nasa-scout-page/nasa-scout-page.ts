import { Component, OnInit, inject, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

import { ScoutStore } from '../../store/scout.store';
import { CandidateGrid } from '../../components/candidate-grid/candidate-grid';
import { ScoutCandidate } from '../../models/scout-api-response.model';
import { CandidateDetailsDialog } from '../../components/candidate-details-dialog/candidate-details-dialog';
import { CandidateToolbar } from '../../components/candidate-toolbar/candidate-toolbar';

@Component({
  selector: 'app-nasa-scout-page',
  imports: [CandidateGrid, DialogModule, CandidateDetailsDialog, CandidateToolbar],
  providers: [ScoutStore],
  templateUrl: './nasa-scout-page.html',
  styleUrl: './nasa-scout-page.scss',
})
export class NasaScoutPage implements OnInit {
  readonly scoutStore = inject(ScoutStore);

  readonly searchText = signal('');
  readonly selectedCandidate = signal<ScoutCandidate | null>(null);
  readonly detailsVisible = signal(false);

  ngOnInit(): void {
    this.scoutStore.loadScoutData();
  }

  showCandidateDetails(): void {
    if (this.selectedCandidate()) {
      this.detailsVisible.set(true);
    }
  }
}
