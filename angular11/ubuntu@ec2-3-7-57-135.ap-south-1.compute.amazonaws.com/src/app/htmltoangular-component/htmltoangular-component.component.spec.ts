import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmltoangularComponentComponent } from './htmltoangular-component.component';

describe('HtmltoangularComponentComponent', () => {
  let component: HtmltoangularComponentComponent;
  let fixture: ComponentFixture<HtmltoangularComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmltoangularComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmltoangularComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
