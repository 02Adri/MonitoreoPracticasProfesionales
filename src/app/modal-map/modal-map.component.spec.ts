import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalMapComponent } from './modal-map.component';

describe('ModalMapComponent', () => {
  let component: ModalMapComponent;
  let fixture: ComponentFixture<ModalMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
