import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformeCoordinadorPage } from './informe-coordinador.page';

describe('InformeCoordinadorPage', () => {
  let component: InformeCoordinadorPage;
  let fixture: ComponentFixture<InformeCoordinadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeCoordinadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
