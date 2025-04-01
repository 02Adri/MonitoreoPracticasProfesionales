import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalInformeLoginComponent } from './modal-informe-login.component';

describe('ModalInformeLoginComponent', () => {
  let component: ModalInformeLoginComponent;
  let fixture: ComponentFixture<ModalInformeLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalInformeLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalInformeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
