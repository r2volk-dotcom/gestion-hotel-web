import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEmpleado } from './registro-empleado';

describe('RegistroEmpleado', () => {
  let component: RegistroEmpleado;
  let fixture: ComponentFixture<RegistroEmpleado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEmpleado],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroEmpleado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
