import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogEditarComponent } from './log-editar.component';

describe('LogEditarComponent', () => {
  let component: LogEditarComponent;
  let fixture: ComponentFixture<LogEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
