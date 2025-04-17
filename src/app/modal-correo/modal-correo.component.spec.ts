import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalCorreoComponent } from './modal-correo.component';

describe('ModalCorreoComponent', () => {
  let component: ModalCorreoComponent;
  let fixture: ComponentFixture<ModalCorreoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalCorreoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
