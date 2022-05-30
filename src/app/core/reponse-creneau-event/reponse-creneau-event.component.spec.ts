import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseCreneauEventComponent } from './reponse-creneau-event.component';

describe('ReponseCreneauEventComponent', () => {
  let component: ReponseCreneauEventComponent;
  let fixture: ComponentFixture<ReponseCreneauEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReponseCreneauEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReponseCreneauEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
