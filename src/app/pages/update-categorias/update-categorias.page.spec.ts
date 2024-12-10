import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateCategoriasPage } from './update-categorias.page';

describe('UpdateCategoriasPage', () => {
  let component: UpdateCategoriasPage;
  let fixture: ComponentFixture<UpdateCategoriasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCategoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
