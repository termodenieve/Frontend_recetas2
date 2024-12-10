import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowRecetasPage } from './show-recetas.page';

describe('ShowRecetasPage', () => {
  let component: ShowRecetasPage;
  let fixture: ComponentFixture<ShowRecetasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRecetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
