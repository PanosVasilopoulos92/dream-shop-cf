import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoGameComponent } from './add-video-game.component';

describe('AddVideoGameComponent', () => {
  let component: AddVideoGameComponent;
  let fixture: ComponentFixture<AddVideoGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVideoGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVideoGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
