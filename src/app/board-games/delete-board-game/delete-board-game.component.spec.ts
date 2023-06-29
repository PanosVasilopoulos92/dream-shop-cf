import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoardGameComponent } from './delete-board-game.component';

describe('DeleteBoardGameComponent', () => {
  let component: DeleteBoardGameComponent;
  let fixture: ComponentFixture<DeleteBoardGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBoardGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBoardGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
