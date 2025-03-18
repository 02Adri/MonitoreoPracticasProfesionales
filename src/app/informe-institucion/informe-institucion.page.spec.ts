import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformeInstitucionPage } from './informe-institucion.page';

describe('InformeInstitucionPage', () => {
  let component: InformeInstitucionPage;
  let fixture: ComponentFixture<InformeInstitucionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeInstitucionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
