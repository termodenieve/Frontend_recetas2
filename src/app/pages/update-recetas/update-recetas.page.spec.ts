import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateRecetasPage } from './update-recetas.page';

describe('UpdateRecetasPage', () => {
  let component: UpdateRecetasPage;
  let fixture: ComponentFixture<UpdateRecetasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRecetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
