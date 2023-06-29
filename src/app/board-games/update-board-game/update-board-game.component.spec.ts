import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBoardGameComponent } from './update-board-game.component';

describe('UpdateBoardGameComponent', () => {
  let component: UpdateBoardGameComponent;
  let fixture: ComponentFixture<UpdateBoardGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBoardGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBoardGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
