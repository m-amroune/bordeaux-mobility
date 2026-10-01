import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { Stations } from '../../services/stations';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  imports: [RouterLink, AsyncPipe, DatePipe],
  selector: 'app-station-detail',
  styleUrl: './station-detail.css',
  templateUrl: './station-detail.html',
})
export class StationDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly stationsService = inject(Stations);

  protected readonly stationId$ = this.route.paramMap.pipe(
  map((params) => Number(params.get('id'))),
);

protected readonly stationState$ = this.stationId$.pipe(
  switchMap((stationId) =>
    this.stationsService.getStations().pipe(
      map((stations) => {
        const station = stations.find((station) => station.id === stationId);

        return station
          ? { status: 'success' as const, station }
          : { status: 'not-found' as const };
      }),
      startWith({ status: 'loading' as const }),
      catchError(() => of({ status: 'error' as const })),
    ),
  ),
);

}