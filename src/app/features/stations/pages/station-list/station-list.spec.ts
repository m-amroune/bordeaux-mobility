import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationList } from './station-list';
import { provideRouter } from '@angular/router';

describe('StationList', () => {
  let component: StationList;
  let fixture: ComponentFixture<StationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StationList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
