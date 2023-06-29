import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBoardGameComponent } from './get-board-game.component';

describe('GetBoardGameComponent', () => {
  let component: GetBoardGameComponent;
  let fixture: ComponentFixture<GetBoardGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetBoardGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetBoardGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
