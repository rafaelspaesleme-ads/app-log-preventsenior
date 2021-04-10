import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDetalheComponent } from './log-detalhe.component';

describe('LogDetalheComponent', () => {
  let component: LogDetalheComponent;
  let fixture: ComponentFixture<LogDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
