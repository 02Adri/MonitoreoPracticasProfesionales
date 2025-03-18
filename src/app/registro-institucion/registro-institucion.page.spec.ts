import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroInstitucionPage } from './registro-institucion.page';

describe('RegistroInstitucionPage', () => {
  let component: RegistroInstitucionPage;
  let fixture: ComponentFixture<RegistroInstitucionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroInstitucionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
