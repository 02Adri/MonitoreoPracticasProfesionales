import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalMostrarInformesComponent } from './modal-mostrar-informes.component';

describe('ModalMostrarInformesComponent', () => {
  let component: ModalMostrarInformesComponent;
  let fixture: ComponentFixture<ModalMostrarInformesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalMostrarInformesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalMostrarInformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
