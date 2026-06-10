import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoHabitaciones } from './grafico-habitaciones';

describe('GraficoHabitaciones', () => {
  let component: GraficoHabitaciones;
  let fixture: ComponentFixture<GraficoHabitaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoHabitaciones],
    }).compileComponents();

    fixture = TestBed.createComponent(GraficoHabitaciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
