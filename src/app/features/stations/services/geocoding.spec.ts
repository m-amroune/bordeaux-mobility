import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Geocoding } from './geocoding';

describe('Geocoding', () => {
  let service: Geocoding;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(Geocoding);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the nearest address', () => {
    let result: string | null = null;

    service.getAddress(44.84, -0.58).subscribe((address) => {
      result = address;
    });

    const request = httpTesting.expectOne(
      (req) =>
        req.url === 'https://data.geopf.fr/geocodage/reverse' &&
        req.params.get('lat') === '44.84' &&
        req.params.get('lon') === '-0.58',
    );

    request.flush({
      features: [
        {
          properties: {
            label: '6 Esplanade Charles de Gaulle 33000 Bordeaux',
          },
        },
      ],
    });

    expect(result).toBe(
      '6 Esplanade Charles de Gaulle 33000 Bordeaux',
    );
  });

  it('should return null when no address is found', () => {
    let result: string | null = 'initial';

    service.getAddress(44.84, -0.58).subscribe((address) => {
      result = address;
    });

    const request = httpTesting.expectOne(
      (req) =>
        req.url === 'https://data.geopf.fr/geocodage/reverse',
    );

    request.flush({
      features: [],
    });

    expect(result).toBeNull();
  });
});
