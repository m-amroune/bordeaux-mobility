import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  mapStationApiRecord,
  StationsApiResponse,
} from '../models/station.model';
import { forkJoin, map } from 'rxjs';
import { Station } from '../models/station.model';

@Service()
export class Stations {
    private readonly http = inject(HttpClient);
    private readonly apiUrl =
  'https://opendata.bordeaux-metropole.fr/api/explore/v2.1/catalog/datasets/ci_vcub_p/records?limit=100';
 getStations() {
  const requests = [0, 100, 200].map((offset) =>
    this.http.get<StationsApiResponse>(
      `${this.apiUrl}&offset=${offset}`
    )
  );

return forkJoin(requests).pipe(
  map((responses) =>
    responses.flatMap((response) =>
      response.results.map(mapStationApiRecord)
    )
  )
);
}
}
