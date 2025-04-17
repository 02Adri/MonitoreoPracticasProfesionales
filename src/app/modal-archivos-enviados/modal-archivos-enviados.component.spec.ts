import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalArchivosEnviadosComponent } from './modal-archivos-enviados.component';

describe('ModalArchivosEnviadosComponent', () => {
  let component: ModalArchivosEnviadosComponent;
  let fixture: ComponentFixture<ModalArchivosEnviadosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalArchivosEnviadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalArchivosEnviadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
