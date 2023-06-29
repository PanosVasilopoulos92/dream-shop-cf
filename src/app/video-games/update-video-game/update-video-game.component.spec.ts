import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVideoGameComponent } from './update-video-game.component';

describe('UpdateVideoGameComponent', () => {
  let component: UpdateVideoGameComponent;
  let fixture: ComponentFixture<UpdateVideoGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVideoGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateVideoGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
