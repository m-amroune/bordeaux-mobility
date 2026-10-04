import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Stations } from '../../services/stations';
import { StationList } from './station-list';

describe('StationList', () => {
  let component: StationList;
  let fixture: ComponentFixture<StationList>;

  const stations = [
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
    {
      id: 2,
      name: 'Tourny',
      city: 'Bordeaux',
      status: 'CONNECTEE',
      bikesAvailable: 0,
      docksAvailable: 20,
      electricBikesAvailable: 0,
      classicBikesAvailable: 0,
      updatedAt: '2026-10-04T08:00:00+00:00',
      latitude: 44.843,
      longitude: -0.576,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationList],
      providers: [
        provideRouter([]),
        {
          provide: Stations,
          useValue: {
            getStations: () => of(stations),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StationList);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should filter stations by search term', async () => {
  fixture.detectChanges();

  const input = fixture.nativeElement.querySelector(
    '#station-search',
  ) as HTMLInputElement;

  input.value = 'Gambetta';
  input.dispatchEvent(new Event('input'));

  await new Promise((resolve) => setTimeout(resolve, 250));
  fixture.detectChanges();

  const stationLinks = Array.from(
    fixture.nativeElement.querySelectorAll('.station-link'),
  ) as HTMLAnchorElement[];

  expect(stationLinks).toHaveLength(1);
  expect(stationLinks[0].textContent?.trim()).toBe('Gambetta');
});

it('should show only stations with available bikes when filter is enabled', async () => {
  fixture.detectChanges();

  await new Promise((resolve) => setTimeout(resolve, 250));
  fixture.detectChanges();

  const checkbox = fixture.nativeElement.querySelector(
    '.filter-row input[type="checkbox"]',
  ) as HTMLInputElement;

  checkbox.click();

  await fixture.whenStable();
  fixture.detectChanges();

  const stationLinks = Array.from(
    fixture.nativeElement.querySelectorAll('.station-link'),
  ) as HTMLAnchorElement[];

  expect(stationLinks).toHaveLength(1);
  expect(stationLinks[0].textContent?.trim()).toBe('Gambetta');
});
});
