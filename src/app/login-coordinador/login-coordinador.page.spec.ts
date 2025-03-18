import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginCoordinadorPage } from './login-coordinador.page';

describe('LoginCoordinadorPage', () => {
  let component: LoginCoordinadorPage;
  let fixture: ComponentFixture<LoginCoordinadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCoordinadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
