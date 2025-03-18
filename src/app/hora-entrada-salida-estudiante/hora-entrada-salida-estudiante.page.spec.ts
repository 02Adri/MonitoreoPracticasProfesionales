import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HoraEntradaSalidaEstudiantePage } from './hora-entrada-salida-estudiante.page';

describe('HoraEntradaSalidaEstudiantePage', () => {
  let component: HoraEntradaSalidaEstudiantePage;
  let fixture: ComponentFixture<HoraEntradaSalidaEstudiantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraEntradaSalidaEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
