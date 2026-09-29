import { Component, inject } from '@angular/core';
import { Stations } from '../../services/stations';
import { AsyncPipe } from '@angular/common';
import { catchError, map, of, startWith } from 'rxjs';

@Component({
  imports: [AsyncPipe],
  selector: 'app-station-list',
  styleUrl: './station-list.css',
  templateUrl: './station-list.html',
})
export class StationList {
  private readonly stationsService = inject(Stations);
  protected readonly stationsState$ = this.stationsService.getStations().pipe(
  map((stations) => ({
    status: 'success' as const,
    stations,
  })),
  startWith({
    status: 'loading' as const,
    stations: [],
  }),
  catchError(() =>
    of({
      status: 'error' as const,
      stations: [],
    }),
  ),
);
}
