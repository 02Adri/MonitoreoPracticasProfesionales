import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroCoordinadorPage } from './registro-coordinador.page';

describe('RegistroCoordinadorPage', () => {
  let component: RegistroCoordinadorPage;
  let fixture: ComponentFixture<RegistroCoordinadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCoordinadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
