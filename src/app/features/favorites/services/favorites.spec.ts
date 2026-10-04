import { TestBed } from '@angular/core/testing';

import { Favorites } from './favorites';

describe('Favorites', () => {
  let service: Favorites;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(Favorites);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with no favorites', () => {
    expect(service.favoriteIds()).toEqual([]);
  });

  it('should add a favorite and persist it in localStorage', () => {
    service.toggleFavorite(42);

    expect(service.favoriteIds()).toEqual([42]);
    expect(service.isFavorite(42)).toBe(true);
    expect(
      JSON.parse(
        localStorage.getItem('bordeaux-mobility-favorites') ?? '[]',
      ),
    ).toEqual([42]);
  });

  it('should remove an existing favorite', () => {
    service.toggleFavorite(42);
    service.toggleFavorite(42);

    expect(service.favoriteIds()).toEqual([]);
    expect(service.isFavorite(42)).toBe(false);
    expect(
      JSON.parse(
        localStorage.getItem('bordeaux-mobility-favorites') ?? '[]',
      ),
    ).toEqual([]);
  });
});
