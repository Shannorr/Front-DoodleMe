import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerEventComponent } from './creer-event.component';

describe('CreerEventComponent', () => {
  let component: CreerEventComponent;
  let fixture: ComponentFixture<CreerEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
