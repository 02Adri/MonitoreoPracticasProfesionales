import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginInstitucionPage } from './login-institucion.page';

describe('LoginInstitucionPage', () => {
  let component: LoginInstitucionPage;
  let fixture: ComponentFixture<LoginInstitucionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginInstitucionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
