import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LucideHeart } from '@lucide/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';

import { Favorites } from '../../../favorites/services/favorites';
import { Stations } from '../../services/stations';

@Component({
  imports: [RouterLink, AsyncPipe, DatePipe, LucideHeart],
  selector: 'app-station-detail',
  styleUrl: './station-detail.css',
  templateUrl: './station-detail.html',
})
export class StationDetail {
  // Services and route
  private readonly route = inject(ActivatedRoute);
  private readonly stationsService = inject(Stations);
  protected readonly favoritesService = inject(Favorites);

  // Station ID from the route
  protected readonly stationId$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
  );

  // Load the matching station and expose page states
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
