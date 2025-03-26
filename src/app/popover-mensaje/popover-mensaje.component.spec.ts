import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PopoverMensajeComponent } from './popover-mensaje.component';

describe('PopoverMensajeComponent', () => {
  let component: PopoverMensajeComponent;
  let fixture: ComponentFixture<PopoverMensajeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PopoverMensajeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
