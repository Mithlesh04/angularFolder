import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmltoangularComponent } from './htmltoangular.component';

describe('HtmltoangularComponent', () => {
  let component: HtmltoangularComponent;
  let fixture: ComponentFixture<HtmltoangularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmltoangularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmltoangularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
