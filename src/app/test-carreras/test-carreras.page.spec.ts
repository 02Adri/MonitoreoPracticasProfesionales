import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCarrerasPage } from './test-carreras.page';

describe('TestCarrerasPage', () => {
  let component: TestCarrerasPage;
  let fixture: ComponentFixture<TestCarrerasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCarrerasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
