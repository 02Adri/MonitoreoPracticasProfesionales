import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalEvaluacionComponent } from './modal-evaluacion.component';

describe('ModalEvaluacionComponent', () => {
  let component: ModalEvaluacionComponent;
  let fixture: ComponentFixture<ModalEvaluacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalEvaluacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
