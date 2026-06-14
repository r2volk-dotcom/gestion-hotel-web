import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHabitacion } from './modal-habitacion';

describe('ModalHabitacion', () => {
  let component: ModalHabitacion;
  let fixture: ComponentFixture<ModalHabitacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalHabitacion],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalHabitacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
