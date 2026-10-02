import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideBike, LucideCircleParking, LucideHeart } from '@lucide/angular';
import {
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';

import { Stations } from '../../services/stations';
import { Favorites } from '../../../favorites/services/favorites';

@Component({
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink,
    LucideBike,
    LucideCircleParking,
    LucideHeart,
  ],
  selector: 'app-station-list',
  styleUrl: './station-list.css',
  templateUrl: './station-list.html',
})
export class StationList {
  private readonly stationsService = inject(Stations);

  protected readonly favoritesService = inject(Favorites);

  protected readonly searchControl = new FormControl('', {
    nonNullable: true,
  });

  protected readonly searchTerm$ = this.searchControl.valueChanges.pipe(
    startWith(this.searchControl.value),
    debounceTime(200),
    map((value) => value.trim().toLocaleLowerCase('fr-FR')),
    distinctUntilChanged(),
  );

  protected readonly bikesAvailableOnly = signal(false);
  protected readonly docksAvailableOnly = signal(false);

  private readonly bikesAvailableOnly$ = toObservable(this.bikesAvailableOnly);

  private readonly docksAvailableOnly$ = toObservable(this.docksAvailableOnly);

  private readonly refresh$ = new Subject<void>();

  protected refreshStations(): void {
    this.refresh$.next();
  }

  protected readonly stationsState$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() =>
      this.stationsService.getStations().pipe(
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
      ),
    ),
  );

  protected readonly filteredStationsState$ = combineLatest([
    this.stationsState$,
    this.searchTerm$,
    this.bikesAvailableOnly$,
    this.docksAvailableOnly$,
  ]).pipe(
    map(([state, searchTerm, bikesAvailableOnly, docksAvailableOnly]) => {
      if (state.status !== 'success') {
        return state;
      }

      return {
        ...state,
        stations: state.stations.filter((station) => {
          const matchesSearch = station.name.toLocaleLowerCase('fr-FR').includes(searchTerm);

          const matchesBikes = !bikesAvailableOnly || station.bikesAvailable > 0;

          const matchesDocks = !docksAvailableOnly || station.docksAvailable > 0;

          return matchesSearch && matchesBikes && matchesDocks;
        }),
      };
    }),
  );
}
