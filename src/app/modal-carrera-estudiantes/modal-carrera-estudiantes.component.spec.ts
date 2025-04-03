import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalCarreraEstudiantesComponent } from './modal-carrera-estudiantes.component';

describe('ModalCarreraEstudiantesComponent', () => {
  let component: ModalCarreraEstudiantesComponent;
  let fixture: ComponentFixture<ModalCarreraEstudiantesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalCarreraEstudiantesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCarreraEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
