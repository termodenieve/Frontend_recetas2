import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowCategoriasPage } from './show-categorias.page';

describe('ShowCategoriasPage', () => {
  let component: ShowCategoriasPage;
  let fixture: ComponentFixture<ShowCategoriasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCategoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
