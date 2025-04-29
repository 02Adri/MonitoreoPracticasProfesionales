import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReunionVirtualComponent } from './reunion-virtual.component';

describe('ReunionVirtualComponent', () => {
  let component: ReunionVirtualComponent;
  let fixture: ComponentFixture<ReunionVirtualComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReunionVirtualComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReunionVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
