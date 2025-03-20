import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearInformeEstudiantePage } from './crear-informe-estudiante.page';

describe('CrearInformeEstudiantePage', () => {
  let component: CrearInformeEstudiantePage;
  let fixture: ComponentFixture<CrearInformeEstudiantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearInformeEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
