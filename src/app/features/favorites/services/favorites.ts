import { Service, signal } from '@angular/core';

@Service()
export class Favorites {
  private readonly storageKey = 'bordeaux-mobility-favorites';

  private readonly favoriteIdsSignal = signal<number[]>(
    this.readFavoriteIds(),
  );

  readonly favoriteIds = this.favoriteIdsSignal.asReadonly();

  isFavorite(stationId: number): boolean {
    return this.favoriteIdsSignal().includes(stationId);
  }

  toggleFavorite(stationId: number): void {
    const currentIds = this.favoriteIdsSignal();

    const nextIds = currentIds.includes(stationId)
      ? currentIds.filter((id) => id !== stationId)
      : [...currentIds, stationId];

    this.favoriteIdsSignal.set(nextIds);
    localStorage.setItem(this.storageKey, JSON.stringify(nextIds));
  }

  private readFavoriteIds(): number[] {
    const storedIds = localStorage.getItem(this.storageKey);

    if (!storedIds) {
      return [];
    }

    try {
      return JSON.parse(storedIds) as number[];
    } catch {
      return [];
    }
  }
}
