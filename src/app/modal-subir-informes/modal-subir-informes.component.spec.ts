import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalSubirInformesComponent } from './modal-subir-informes.component';

describe('ModalSubirInformesComponent', () => {
  let component: ModalSubirInformesComponent;
  let fixture: ComponentFixture<ModalSubirInformesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalSubirInformesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSubirInformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
