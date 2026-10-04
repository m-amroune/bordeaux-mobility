import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { forkJoin, map } from 'rxjs';

import {
  mapStationApiRecord,
  StationsApiResponse,
} from '../models/station.model';

@Service()
export class Stations {
  // API configuration
  private readonly http = inject(HttpClient);
  private readonly apiUrl =
    'https://opendata.bordeaux-metropole.fr/api/explore/v2.1/catalog/datasets/ci_vcub_p/records?limit=100';

  // Load all API pages
  getStations() {
    const requests = [0, 100, 200].map((offset) =>
      this.http.get<StationsApiResponse>(
        `${this.apiUrl}&offset=${offset}`,
      ),
    );

    // Merge and map API results
    return forkJoin(requests).pipe(
      map((responses) =>
        responses.flatMap((response) =>
          response.results.map(mapStationApiRecord),
        ),
      ),
    );
  }
}
