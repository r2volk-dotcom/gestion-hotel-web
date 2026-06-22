import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPagosModal } from './registro-pagos-modal';

describe('RegistroPagosModal', () => {
  let component: RegistroPagosModal;
  let fixture: ComponentFixture<RegistroPagosModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPagosModal],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPagosModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
