import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalCarreraComponent } from './modal-carrera.component';

describe('ModalCarreraComponent', () => {
  let component: ModalCarreraComponent;
  let fixture: ComponentFixture<ModalCarreraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalCarreraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
