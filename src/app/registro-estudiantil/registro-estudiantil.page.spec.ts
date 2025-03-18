import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroEstudiantilPage } from './registro-estudiantil.page';

describe('RegistroEstudiantilPage', () => {
  let component: RegistroEstudiantilPage;
  let fixture: ComponentFixture<RegistroEstudiantilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEstudiantilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
