import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAddComponent } from './log-add.component';

describe('LogAddComponent', () => {
  let component: LogAddComponent;
  let fixture: ComponentFixture<LogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
