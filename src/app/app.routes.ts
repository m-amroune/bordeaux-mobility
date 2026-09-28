import { Routes } from '@angular/router';
import { StationList } from './features/stations/pages/station-list/station-list';
import { StationDetail } from './features/stations/pages/station-detail/station-detail';
import { Favorites } from './features/favorites/pages/favorites/favorites';
import { NotFound } from './core/pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: StationList,
  },
  {
    path: 'stations/:id',
    component: StationDetail,
  },
  {
    path: 'favorites',
    component: Favorites,
  },
  {
    path: '**',
    component: NotFound,
  },
];