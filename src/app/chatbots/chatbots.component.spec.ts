import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChatbotsComponent } from './chatbots.component';

describe('ChatbotsComponent', () => {
  let component: ChatbotsComponent;
  let fixture: ComponentFixture<ChatbotsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ChatbotsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
