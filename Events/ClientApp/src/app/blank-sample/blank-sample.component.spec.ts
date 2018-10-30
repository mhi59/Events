import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankSampleComponent } from './blank-sample.component';

describe('BlankSampleComponent', () => {
  let component: BlankSampleComponent;
  let fixture: ComponentFixture<BlankSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
