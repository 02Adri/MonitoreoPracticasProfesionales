import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AgendarVisitasComponent } from './agendar-visitas.component';

describe('AgendarVisitasComponent', () => {
  let component: AgendarVisitasComponent;
  let fixture: ComponentFixture<AgendarVisitasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AgendarVisitasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgendarVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
