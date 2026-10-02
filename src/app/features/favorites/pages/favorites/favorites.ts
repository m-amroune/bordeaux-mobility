import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import {
  LucideBike,
  LucideCircleParking,
  LucideHeart,
} from '@lucide/angular';

import { Stations } from '../../../stations/services/stations';
import { Favorites as FavoritesService } from '../../services/favorites';

@Component({
  imports: [
  AsyncPipe,
  RouterLink,
  LucideBike,
  LucideCircleParking,
  LucideHeart,
],
  selector: 'app-favorites',
  styleUrl: './favorites.css',
  templateUrl: './favorites.html',
})
export class Favorites {
  private readonly stationsService = inject(Stations);
private readonly favoritesService = inject(FavoritesService);

private readonly favoriteIds$ = toObservable(
  this.favoritesService.favoriteIds,
);

protected readonly favoriteStations$ = combineLatest([
  this.stationsService.getStations(),
  this.favoriteIds$,
]).pipe(
  map(([stations, favoriteIds]) =>
    stations.filter((station) => favoriteIds.includes(station.id)),
  ),
);
}
