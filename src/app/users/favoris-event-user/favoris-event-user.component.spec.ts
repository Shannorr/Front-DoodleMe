import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorisEventUserComponent } from './favoris-event-user.component';

describe('FavorisEventUserComponent', () => {
  let component: FavorisEventUserComponent;
  let fixture: ComponentFixture<FavorisEventUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavorisEventUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavorisEventUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
