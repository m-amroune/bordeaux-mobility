import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { Stations } from './stations';

describe('Stations', () => {
  let service: Stations;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(Stations);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all API pages and map stations', () => {
    let result: unknown;

    service.getStations().subscribe((stations) => {
      result = stations;
    });

    const requests = httpTesting.match(
      (request) =>
        request.url.includes('ci_vcub_p/records'),
    );

    expect(requests.length).toBe(3);

    requests[0].flush({
      total_count: 221,
      results: [
        {
          ident: 1,
          nom: 'Gambetta',
          commune: 'Bordeaux',
          etat: 'CONNECTEE',
          nbvelos: 5,
          nbplaces: 10,
          nbelec: 2,
          nbclassiq: '3',
          mdate: '2026-10-04T08:00:00+00:00',
          geo_point_2d: {
            lat: 44.8404,
            lon: -0.5805,
          },
        },
      ],
    });

    requests[1].flush({
      total_count: 221,
      results: [],
    });

    requests[2].flush({
      total_count: 221,
      results: [],
    });

    expect(result).toEqual([
      {
        id: 1,
        name: 'Gambetta',
        city: 'Bordeaux',
        status: 'CONNECTEE',
        bikesAvailable: 5,
        docksAvailable: 10,
        electricBikesAvailable: 2,
        classicBikesAvailable: 3,
        updatedAt: '2026-10-04T08:00:00+00:00',
        latitude: 44.8404,
        longitude: -0.5805,
      },
    ]);
  });
});
