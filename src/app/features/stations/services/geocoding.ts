import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map } from 'rxjs';

interface ReverseGeocodingResponse {
  features: {
    properties: {
      label: string;
    };
  }[];
}

@Service()
export class Geocoding {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'https://data.geopf.fr/geocodage/reverse';

  // Find the nearest address from station coordinates
  getAddress(latitude: number, longitude: number) {
    return this.http
      .get<ReverseGeocodingResponse>(this.apiUrl, {
        params: {
          lat: latitude,
          lon: longitude,
          index: 'address',
          limit: 1,
        },
      })
      .pipe(
        map((response) =>
          response.features[0]?.properties.label ?? null
        ),
      );
  }
}
