import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineViewListComponent } from './timeline-view-list.component';

describe('TimelineViewListComponent', () => {
  let component: TimelineViewListComponent;
  let fixture: ComponentFixture<TimelineViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
