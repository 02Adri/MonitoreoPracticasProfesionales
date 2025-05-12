import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalCartaComponent } from './modal-carta.component';

describe('ModalCartaComponent', () => {
  let component: ModalCartaComponent;
  let fixture: ComponentFixture<ModalCartaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalCartaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
