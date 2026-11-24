import { Component, input, output } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  SelectionChangedEvent,
  themeQuartz,
} from 'ag-grid-community';

import { ScoutCandidate } from '../../models/scout-api-response.model';
import { getHighestRiskIndicator } from '../../models/scout-api-response.model';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-candidate-grid',
  imports: [AgGridAngular],
  templateUrl: './candidate-grid.html',
  styleUrl: './candidate-grid.scss',
})
export class CandidateGrid {
  readonly rowData = input.required<ScoutCandidate[]>();
  readonly quickFilterText = input('');
  readonly selectedCandidateChange = output<ScoutCandidate | null>();

  readonly theme = themeQuartz;

  readonly rowSelection = {
    mode: 'singleRow' as const,
    checkboxes: false,
    enableClickSelection: true,
  };

  readonly columnDefs: ColDef<ScoutCandidate>[] = [
    {
      field: 'objectName',
      headerName: 'Object Name',
      minWidth: 150,
    },
    {
      field: 'rating',
      headerName: 'Rating',
    },
    {
      field: 'nObs',
      headerName: 'Observations',
    },
    {
      field: 'arc',
      headerName: 'Observation Arc',
      minWidth: 150,
    },
    {
      field: 'moid',
      headerName: 'MOID',
    },
    {
      field: 'caDist',
      headerName: 'CA Distance',
    },
    {
      field: 'vInf',
      headerName: 'V Infinity',
    },
    {
      field: 'H',
      headerName: 'Absolute Magnitude',
    },
    {
      field: 'Vmag',
      headerName: 'Visual Magnitude',
    },
    {
      field: 'neoScore',
      headerName: 'NEO Score',
    },
    {
      field: 'phaScore',
      headerName: 'PHA Score',
    },
    {
      field: 'lastRun',
      headerName: 'Last Run',
      minWidth: 160,
    },
    {
      // derived/computed field
      headerName: 'Highest Risk Indicator',
      valueGetter: (params) => (params.data ? getHighestRiskIndicator(params.data) : null),
      sortable: true,
      filter: 'agNumberColumnFilter',
    },
  ];

  readonly defaultColDef: ColDef<ScoutCandidate> = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 120,
  };

  readonly pagination = true;
  readonly paginationPageSize = 10;
  readonly paginationPageSizeSelector = [10, 20, 50];

  onSelectionChanged(event: SelectionChangedEvent<ScoutCandidate>): void {
    this.selectedCandidateChange.emit(event.selectedNodes?.[0]?.data ?? null);
  }
}
