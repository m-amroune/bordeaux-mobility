import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LucideHeart } from '@lucide/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';

import { Favorites } from '../../../favorites/services/favorites';
import { Stations } from '../../services/stations';
import { Geocoding } from '../../services/geocoding';

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
  private readonly geocodingService = inject(Geocoding);
  protected readonly favoritesService = inject(Favorites);

  // Station ID from the route
  protected readonly stationId$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
  );

 // Load the matching station, then resolve its address
protected readonly stationState$ = this.stationId$.pipe(
  switchMap((stationId) =>
    this.stationsService.getStations().pipe(
      switchMap((stations) => {
        const station = stations.find((station) => station.id === stationId);

        if (!station) {
          return of({ status: 'not-found' as const });
        }

        return this.geocodingService
          .getAddress(station.latitude, station.longitude)
          .pipe(
            map((address) => ({
              status: 'success' as const,
              station,
              address,
            })),
            catchError(() =>
              of({
                status: 'success' as const,
                station,
                address: null,
              }),
            ),
          );
      }),
      startWith({ status: 'loading' as const }),
      catchError(() => of({ status: 'error' as const })),
    ),
  ),
);
}
