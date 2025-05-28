import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalInstructivoComponent } from './modal-instructivo.component';

describe('ModalInstructivoComponent', () => {
  let component: ModalInstructivoComponent;
  let fixture: ComponentFixture<ModalInstructivoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalInstructivoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalInstructivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
