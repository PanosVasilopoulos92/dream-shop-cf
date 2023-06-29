import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVideoGameComponent } from './delete-video-game.component';

describe('DeleteVideoGameComponent', () => {
  let component: DeleteVideoGameComponent;
  let fixture: ComponentFixture<DeleteVideoGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteVideoGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteVideoGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
