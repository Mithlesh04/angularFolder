import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAngularChartComponent } from './google-angular-chart.component';

describe('GoogleAngularChartComponent', () => {
  let component: GoogleAngularChartComponent;
  let fixture: ComponentFixture<GoogleAngularChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleAngularChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAngularChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
