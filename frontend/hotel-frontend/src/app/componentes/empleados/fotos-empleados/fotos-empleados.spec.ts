import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosEmpleados } from './fotos-empleados';

describe('FotosEmpleados', () => {
  let component: FotosEmpleados;
  let fixture: ComponentFixture<FotosEmpleados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FotosEmpleados],
    }).compileComponents();

    fixture = TestBed.createComponent(FotosEmpleados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
